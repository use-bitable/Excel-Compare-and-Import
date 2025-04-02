"""Table module"""

from __future__ import annotations
import server.base
from typing import Optional
from concurrent.futures import ThreadPoolExecutor
from baseopensdk import BaseClient
from server.utils import paginate, group_by
from server.data_parser import dataParser
from server.file.utils import get_file_from_url
from server.cell_value import CELL_PARSER
from server.cell_value.types import FileItemValue
from server.events import EventsManager
from .compare import CompareMode
from .events import (
    BaseTableLoadRecordsContext,
    OnBaseTableLoadRecordsEvent,
    BaseTableLoadFieldsContext,
    OnBaseTableLoadFieldsEvent,
    OnBaseTableInitEvent,
    BaseTableInitContext,
    OnLinkTableInitEvent,
    OnLinkTableLoadFieldsEvent,
    OnLinkTableLoadRecordsEvent,
    OnBaseTableUploadAttachmentsEvent,
    BaseTableUploadAttachmentsContext,
)
from .const import LINK_FIELD_TYPES
from .cell import ICell
from .field import IBaseField, get_base_fields, FieldMap
from .record import IBaseRecord, get_base_table_records, IRecord, IDiffRecord, DiffType


class ITable[R: IRecord]:
    """Index Table interface."""

    _records: list[R]
    _indexed_records: dict[tuple, list[IBaseRecord]]
    """Cache indexed records in different index fields."""

    def __init__(
        self,
        index_field: Optional[list[str]] = None,
    ) -> None:
        self.index_field = index_field
        self._indexed_records = {}

    @property
    def index_field(self):
        return self._index_field

    @index_field.setter
    def index_field(self, value: list[str] | None):
        self._index_field = value
        if self._records:
            map(lambda x: x.set_index(value), self._records)

    def build_indexed_records(self):
        """Build indexed records."""
        self._indexed_records = group_by(self._records, lambda x: x.index)

    def search_index(self, index: tuple):
        """Search indexed records by index."""
        if not self._indexed_records:
            self.build_indexed_records()
        return self._indexed_records.get(index)


class IBaseTable(ITable[IBaseRecord]):
    """Base table interface."""

    _fields: Optional[dict[str, IBaseField]] = None
    _link_tables: Optional[dict[str, ILinkTable]] = None
    events: EventsManager

    def __init__(
        self,
        parent: server.base.base.IBase,
        id: str,
        name: str,
        view_id: Optional[str] = None,
        field_maps: Optional[list[FieldMap]] = None,
        index_field: Optional[list[str]] = None,
        on_load_fields_event=OnBaseTableLoadFieldsEvent,
        on_load_records_event=OnBaseTableLoadRecordsEvent,
        on_init_event=OnBaseTableInitEvent,
    ) -> None:
        self.parent = parent
        self.events = parent.events
        self.on_load_fields_event = on_load_fields_event
        self.on_load_records_event = on_load_records_event
        self.on_init_event = on_init_event
        with self.events.context(
            on_init_event,
            context_data=BaseTableInitContext(
                table_id=id,
                table_name=name,
                view_id=view_id,
            ),
        ):
            super().__init__(index_field)
            self.id = id
            self.name = name
            self.field_maps = (
                {
                    fm.get("id"): fm
                    for fm in [m for m in field_maps if m["source_field"]]
                }
                if field_maps
                else None
            )
            self.parent = parent
            self.events = parent.events
            self.view_id = view_id
            self._diff = IDiffTable(id, name, parent.client)
            self._attachments: dict[str, FileItemValue] = {}

    @property
    def useable_fields(self):
        return (
            {f["id"] for f in self.field_maps.values() if f["source_field"]}
            if self.field_maps
            else set()
        )

    def get_link_tables(self) -> dict[str, ILinkTable]:
        if self._link_tables is None:
            self._link_tables = {}
            if self._fields is None:
                return {}
            table_map = self.parent.get_table_map()
            for field in self._fields.values():
                if (
                    field.type not in LINK_FIELD_TYPES
                    or field.property.table_id is None
                ):
                    continue
                if field.link_config and field.children:
                    table_meta = table_map.get(field.property.table_id)
                    if table_meta is None:
                        continue
                    self._link_tables[field.property.table_id] = ILinkTable(
                        self,
                        field.property.table_id,
                        table_meta.name,
                        primary_key=field.link_config.get("primary_key"),
                        view_id=field.link_config.get("view_id"),
                        field_maps=field.children,
                    )
        return self._link_tables

    def get_link_table(self, table_id: str) -> Optional[ILinkTable]:
        """Get link table by table id."""
        if self._link_tables is None:
            self.get_link_tables()
        return self._link_tables.get(table_id)

    def get_fields(self):
        if not (self._fields is None):
            return self._fields

        with self.events.context(
            self.on_load_fields_event,
            context_data=BaseTableLoadFieldsContext(
                table_id=self.id, table_name=self.name
            ),
        ) as trigger:

            self._fields = {
                f.field_id: IBaseField(self, f, self.field_maps.get(f.field_id))
                for f in paginate(
                    get_base_fields(
                        self.id,
                        self.parent.client,
                        view_id=self.view_id,
                    ),
                    on_page=lambda x: trigger.process(
                        success=x["loaded"],
                        total=x["total"],
                    ),
                )
                if f.field_id in self.useable_fields
            }
        return self._fields

    def get_field(self, field_id: str) -> Optional[IBaseField]:
        """Get field by field id."""
        if self._fields is None:
            self.get_fields()
        return self._fields.get(field_id)

    def get_records(self):
        if not (self._records is None):
            return self._records
        fields = self.get_fields().values()
        with self.events.context(
            self.on_load_records_event,
            context_data=BaseTableLoadRecordsContext(
                table_id=self.id, table_name=self.name
            ),
        ) as trigger:
            self._records = paginate(
                get_base_table_records(
                    self.id,
                    self.parent.client,
                    fields=fields,
                    index_field=self.index_field,
                ),
                on_page=lambda x: trigger.process(
                    success=x["loaded"],
                    total=x["total"],
                ),
            )
        return self._records

    def load_link_tables(self):
        link_tables = self.get_link_tables()

        def load_link_table(table: ILinkTable):
            table.get_fields()
            table.get_records()
            table.build_indexed_records()

        for table in link_tables.values():
            load_link_table(table)

    def upload_attachments(self):
        files = self._attachments.values()
        if not files:
            return
        with (
            ThreadPoolExecutor() as executor,
            self.events.context(
                OnBaseTableUploadAttachmentsEvent,
                context_data=BaseTableUploadAttachmentsContext(
                    table_id=self.id,
                    table_name=self.name,
                ),
            ) as trigger,
        ):
            progress = trigger.get_progress_manager(len(files))

            def upload_file(file: FileItemValue):
                name = file.get("name")
                path = file.get("path")
                type = file.get("type")
                try:
                    f = get_file_from_url(path) if type == "url" else path
                    size = file.get("size") or len(f)
                    token = self.parent.upload_file(f, name, size)
                    if token:
                        progress.update(
                            success=1,
                            msg={
                                "en": f"Successfully uploaded {name}",
                                "zh": f"成功上传{name}",
                            },
                        )
                except Exception as e:
                    progress.update(
                        failed=1,
                        errors=[str(e)],
                        msg={
                            "en": f"Failed to upload {name}",
                            "zh": f"上传{name}失败",
                        },
                    )
                file["token"] = token

            executor.map(
                upload_file,
                self._attachments.values(),
            )

    def compare(
        self, data_table: IDataTable, mode: CompareMode = CompareMode.APPEND.value
    ) -> IDiffTable:
        diff_table = self._diff
        self.load_link_tables()
        if mode == CompareMode.APPEND.value:
            for records in data_table.records_iterator():
                pass

        return diff_table


class ILinkTable(IBaseTable):
    """Link Table interface."""

    def __init__(
        self,
        parent,
        id: str,
        name: str,
        primary_key: str = None,
        view_id: Optional[str] = None,
        field_maps: Optional[list[FieldMap]] = None,
    ) -> None:

        super().__init__(
            parent,
            id,
            name,
            view_id,
            field_maps,
            [primary_key],
            on_init_event=OnLinkTableInitEvent,
            on_load_fields_event=OnLinkTableLoadFieldsEvent,
            on_load_records_event=OnLinkTableLoadRecordsEvent,
        )


class IDataTable(ITable[IRecord]):

    def __init__(
        self,
        type: str,
        data,
        fields: list[IBaseField],
        events: EventsManager,
        config: dict = None,
        index_field: list[str] = None,
    ):
        super().__init__(index_field)
        self.type = type
        self.data_parser = dataParser
        self.data = data
        self.fields = fields
        self.config = config
        self.events = events

    def records_iterator(self):
        for records in self.data_parser.parse(self.type, self.data, self.config):
            yield [
                IRecord(
                    cells=[
                        ICell.create_cell(
                            r[f.source_field],
                            f,
                            CELL_PARSER.parse_data_value(f, r[f.source_field]),
                        )
                        for f in self.fields
                    ],
                    index_field=self.index_field,
                )
                for r in records
            ]


class IDiffTable(ITable[IDiffRecord]):
    """Diff Table interface."""

    def __init__(
        self,
        id: str,
        name: str,
        client: BaseClient,
    ) -> None:
        self.id = id
        self.client = client
        self.name = name
        self._records = []

    def append(self, record: IDiffRecord):
        self._records.append(record)

    def add(self):
        """Add diff record"""
        pass

    def update_base(self):
        pass
