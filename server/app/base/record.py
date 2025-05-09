from __future__ import annotations
from typing import Optional
from baseopensdk import BaseClient
from baseopensdk.api.base.v1.resource.app_table_record import (
    BatchCreateAppTableRecordRequest,
    BatchCreateAppTableRecordResponse,
)
from requests.exceptions import RequestException
from app.cell_value import CELL_PARSER
from .patches.search_app_table_record_request import SearchAppTableRecordRequest
from .patches.search_app_table_record_request_body import (
    SearchAppTableRecordRequestBody,
)
from .patches.search_app_table_record_response import SearchAppTableRecordResponse
from .exceptions import ListRecordsException
from .field import IBaseField
from .cell import ICell
from .const import (
    MAX_GET_RECORDS_ONCE_LIMIT,
    MAX_CREATE_RECORDS_ONCE_LIMIT,
    MAX_DELETE_RECORDS_ONCE_LIMIT,
    MAX_UPDATE_RECORDS_ONCE_LIMIT,
)
from .types import DiffType
from ..types import UserIdType


def get_base_table_records(
    table_id: str,
    base_client: BaseClient,
    fields: Optional[list[IBaseField]] = None,
    index_field: list[str] | None = None,
    page_size: int = MAX_GET_RECORDS_ONCE_LIMIT,
    user_id_type: UserIdType = UserIdType.open_id,
    automatic_fields: bool = True,
):
    """Get records from base table.

    Args:
        table_id (str): Base table id
        base_client (BaseClient): Base client
        fields (Optional[list[IBaseField]], optional): Fields to get. Defaults to None.
        index_field (list[str] | None, optional): Index fields. Defaults to None.
        page_size (int, optional): Page size. Defaults to MAX_GET_RECORDS_ONCE_LIMIT.
        user_id_type (UserIdType, optional): User id type. Defaults to UserIdType.open_id.value.
        automatic_fields (bool, optional): if get automatic fields. Defaults to True.

    Returns:
        Callable[[str | None], tuple[str | None, list[IBaseRecord], bool, int]]: Query function
    """
    req = (
        SearchAppTableRecordRequest.builder()
        .table_id(table_id)
        .page_size(page_size)
        .user_id_type(user_id_type.value)
    )
    req_body = SearchAppTableRecordRequestBody().builder()
    if fields:
        req_body.field_names([field.name for field in fields])

    if automatic_fields:
        req_body.automatic_fields(automatic_fields)
    req_body = req_body.build()

    def get_records(page_token: str | None = None):
        if not (page_token is None):
            req.page_token(page_token)
        res: SearchAppTableRecordResponse = base_client.base.v1.app_table_record.search(
            req.request_body(req_body).build()
        )
        if not res.success():
            raise ListRecordsException(f"Error[{res.code}]: {res.msg}")
        records = [
            IBaseRecord(
                cells=[
                    ICell.create_cell(
                        value=r.fields[field.name],
                        field=field,
                        parsed_value=CELL_PARSER.parse_base_value(
                            field.type, field, r.fields[field.name]
                        ),
                    )
                    for field in fields or []
                ],
                record_id=r.record_id,
                created_time=r.created_time,
                modified_time=r.last_modified_by,
                index_field=index_field,
            )
            for r in res.data.items
        ] or []
        return (res.data.page_token, records, res.data.has_more, res.data.total)

    return get_records


def add_records_to_base(
    table_id: str,
    base_client: BaseClient,
    record: list[IBaseRecord],
    user_id_type: UserIdType = UserIdType.open_id,
):
    """Add records to base table.

    Args:
        table_id (str): Base table id
        base_client (BaseClient): Base client
        record (list[IRecord]): Records to add
        user_id_type (UserIdType, optional): User id type. Defaults to UserIdType.open_id.

    Raises:
        RequestException: Failed to add records

    Returns:
        List[AppTableRecord]: Records
    """
    req = (
        BatchCreateAppTableRecordRequest.builder()
        .table_id(table_id)
        .user_id_type(user_id_type.value)
    )
    req.request_body([r.to_app_record() for r in record])
    res: BatchCreateAppTableRecordResponse = (
        base_client.base.v1.app_table_record.batch_create(req.build())
    )
    if not res.success():
        raise RequestException(f"Failed to add records: {res.msg}")
    return res.data.records


def batch_add_records_to_base(
    table_id: str,
    base_client: BaseClient,
    records: list[IBaseRecord],
    batch_size: int = MAX_CREATE_RECORDS_ONCE_LIMIT,
    user_id_type: UserIdType = UserIdType.open_id,
):
    """Batch add records to base table.

    Args:
        table_id (str): Base table id
        base_client (BaseClient): Base client
        records (list[IRecord]): Records to add
        batch_size (int, optional): Batch size. Defaults to 50.
        user_id_type (UserIdType, optional): User id type. Defaults to UserIdType.open_id.

    Raises:
        RequestException: Failed to add records

    Returns:
        List[AppTableRecord]: Records
    """
    # batched_records = batch(records, batch_size)
    # req = BatchCreateAppTableRecordRequest.builder()\
    #     .table_id(table_id)\
    #     .user_id_type(user_id_type.value)
    # for chunk in batched_records:
    #     req.request_body((chunk))
    #     res: BatchCreateAppTableRecordResponse = base_client.base.v1.app_table_record.batch_create(req.build())
    #     if res.code != BASE_REQUEST_SUCCESS_CODE:
    #         raise RequestException(f"Failed to add records: {res.msg}")
    #     map(lambda record, res_data: record, chunk, res.data.records)
    # return


class IRecord:

    __slots__ = ("cells", "index", "id")

    cells: dict[str, ICell]
    index: Optional[tuple]
    id: Optional[str]

    def __init__(
        self,
        cells: list[ICell],
        record_id: Optional[str] = None,
        index_field: Optional[list[str]] = None,
    ):
        self.id = record_id
        if cells:
            self.set_cells(cells)
        if index_field:
            self.set_index(index_field)

    def set_index(self, index_field: Optional[list[str]] = None) -> tuple | None:
        """Set record index"""
        self.index = (
            None
            if not index_field
            else tuple(self.get_cell(id).parsed_value for id in index_field)
        )
        return self.index

    def get_cell(self, field_id: str) -> ICell | None:
        return self.cells.get(field_id)

    def set_cell(self, cell: ICell) -> None:
        """Set cell"""
        self.cells[cell.field_id] = cell

    def set_cells(self, cells: list[ICell]) -> None:
        for cell in cells:
            self.set_cell(cell)

    def __eq__(self, value: object) -> bool:
        if not isinstance(value, IRecord):
            return False
        return self.index == value.index

    def __len__(self) -> int:
        return len(filter(lambda c: c.parsed_value is not None, self.cells.values()))


class IBaseRecord(IRecord):
    """Record Interface."""

    __slots__ = ("cells", "index", "id", "created_time", "modified_time")

    created_time: Optional[int]
    modified_time: Optional[int]

    def __init__(
        self,
        cells: list[ICell],
        record_id: Optional[str] = None,
        index_field: Optional[list[str]] = None,
        created_time: Optional[int] = None,
        modified_time: Optional[int] = None,
    ):
        super().__init__(cells, record_id=record_id, index_field=index_field)
        self.created_time = created_time
        self.modified_time = modified_time


class IDiffRecord(IRecord):

    __slots__ = ("cells", "index", "type", "id")

    def __init__(
        self,
        type: DiffType,
        record_id: str | None,
        cells: list[ICell],
        index_field=None,
    ):
        super().__init__(cells, record_id=record_id, index_field=index_field)
        self.type = type

    def to_app_record(self):
        """Convert to AppTableRecord"""
        fields = {
            cell.get_field().name: cell.parsed_value
            for cell in self.cells.values()
            if cell.auto == False
        }
        return {"fields": fields}
