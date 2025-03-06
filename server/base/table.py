"""Table module"""

from __future__ import annotations
from functools import lru_cache
from typing import Optional
from baseopensdk import BaseClient
from .shared import group_by
from .field import IField
from .cell import ICell
from .record import IRecord, get_base_table_records
from .field import get_base_fields, FieldMap
from .base import create_client
from .const import BASE_PRODUCT
from .token import encode_task_token
from .base import create_client
from .cellValue import CELL_PARSER


class ITable(object):
    """Table interface."""

    __fields: dict[str, IField] = {}
    __records: list[IRecord]
    primary_key: Optional[str] = None
    index_field: Optional[list[str]] = None
    id: Optional[str] = None

    def __init__(
        self,
        index_field: Optional[list[str]] = None,
        id: Optional[str] = None,
    ) -> None:
        if index_field is not None:
            if not isinstance(index_field, list):
                raise TypeError(
                    f"Index field must be list, but got {type(index_field)}"
                )
            self.set_index_field(index_field)
        self.id = id

    def get_records(self) -> list[IRecord]:
        return self.__records

    def set_records(self, records: list[IRecord]) -> None:
        self.__records = records

    def get_fields(self) -> dict[str, IField]:
        return self.__fields

    def get_field(self, field_id: str) -> IField:
        if field_id not in self.__fields:
            raise KeyError(f"Field {field_id} not found")
        return self.__fields[field_id]

    def add_field(self, field: IField) -> None:
        if not isinstance(field, IField):
            raise TypeError(f"Field must be IField type, but got {type(field)}")
        self.__fields[field.id] = field
        if field.is_primary:
            self.primary_key = field.id

    def add_fields(self, fields: list[IField]) -> None:
        if not isinstance(fields, list):
            raise TypeError(f"Fields must be list, but got {type(fields)}")
        for field in fields:
            self.add_field(field)

    def set_fields(self, fields: list[IField]) -> None:
        self.__fields = {}
        self.add_fields(fields)

    @lru_cache
    def get_indexed_records_map(
        self, index_field: Optional[list[str]] = None
    ) -> dict[tuple, list[IRecord]]:
        index = index_field or self.index_field
        return group_by(
            self.__records,
            lambda record: (
                record.index if index is not None else record.get_cell(index).raw_value
            ),
        )

    def set_index_field(self, index_field: list[str]) -> None:
        if len(index_field) == 0:
            self.index_field = None
        self.index_field = index_field


class IBaseTable(ITable):
    """Base table interface."""

    link_table: Optional[dict[str, ILinkedBaseTable]] = None
    client: BaseClient
    ns: str
    base_id: str
    product: BASE_PRODUCT = "FEISHU"

    def __init__(
        self,
        id: str,
        base_id: str,
        client: BaseClient,
        ns: str,
        product: BASE_PRODUCT = "FEISHU",
        field_maps: Optional[list[FieldMap]] = None,
        index_field: Optional[list[str]] = None,
    ) -> None:
        super().__init__(index_field, id=id)
        self.client = client
        self.ns = ns
        self.base_id = base_id
        self.product = product
        self.get_base_table_fields(field_maps)

    def get_link_table(self, field_id: str) -> ITable:
        field = self.get_field(field_id)
        if not field.type in CELL_PARSER.link_types:
            raise ValueError(f"Field {field.name}({field_id}) is not a link field")
        if self.link_table is None:
            self.link_table = {}
        if field_id not in self.link_table:
            client = create_client(
                field.linked_table_id,
                self.client._config.personal_base_token,
                self.product,
            )
            t = ILinkedBaseTable(
                self,
                field.linked_table_id,
                client,
                (
                    field.link_config.get("primary_key")
                    if field.link_config is not None
                    else None
                ),
            )
            t.get_base_table_records()
            self.link_table[field_id] = t
        return self.link_table[field_id]

    def get_fields_from_field_map(
        self, field_maps: Optional[list[FieldMap]] = None
    ) -> None:
        raw_fields = get_base_fields(
            self.id,
            self.client,
        )
        grouped_maps = None
        if field_maps is not None:
            filtered_maps = list(
                filter(lambda m: m.get("source_field") is not None, field_maps)
            )
            grouped_maps = group_by(filtered_maps, lambda m: m.get("id"))
        fields: list[IField] = []
        for raw_field in raw_fields:
            m = grouped_maps.get(raw_field.field_id, None)
            if not m is None:
                field = IField(raw_field, m[0], self)
                fields.append(field)
        self.set_fields(fields)

    def get_base_table_records(self) -> list[IRecord]:
        field_names = [field.name for field in self.get_fields().values()]
        raw_records = get_base_table_records(
            self.id, self.client, field_names=field_names
        )
        records: list[IRecord] = []
        for raw_record in raw_records:
            cells: list[ICell] = []
            for field_id, value in raw_record.fields.items():
                field = self.get_field(field_id)
                cell = ICell(field, self.ns, value)
                cells.append(cell)
            record = IRecord(
                cells,
                raw_record.record_id,
                self.index_field,
                raw_record.created_time,
                raw_record.modified_time,
            )
            records.append(record)
        self.set_records(records)


class ILinkedBaseTable(IBaseTable):
    target_table: IBaseTable

    def __init__(
        self,
        target: IBaseTable,
        id: str,
        base_id: str,
        client: BaseClient,
        ns: str,
        product: BASE_PRODUCT = "FEISHU",
        index_field: Optional[list[str]] = None,
    ) -> None:
        super().__init__(id, base_id, client, ns, product, index_field=index_field)
        self.target_table = target
        self.get_base_fields()

    def get_base_fields(self) -> dict[str, IField]:
        raw_fields = get_base_fields(
            self.id,
            self.client,
        )
        fields: list[IField] = []
        for raw_field in raw_fields:
            if raw_field.field_id == self.primary_key:
                fields.append(IField(raw_field, table=self))
        self.set_fields(fields)

    def get_base_table_records(self) -> list[IRecord]:
        field_names = [field.name for field in self.get_fields().values()]
        raw_records = get_base_table_records(
            self.id, self.client, field_names=field_names
        )
        records: list[IRecord] = []
        for raw_record in raw_records:
            cells: list[ICell] = []
            for field_id, value in raw_record.fields.items():
                field = self.get_field(field_id)
                cell = ICell(field, self.ns, value)
                cells.append(cell)
            record = IRecord(
                cells,
                raw_record.record_id,
                self.index_field,
                raw_record.created_time,
                raw_record.last_modified_time,
            )
            records.append(record)
        self.set_records(records)
