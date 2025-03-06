#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Records utility functions

from __future__ import annotations
from typing import Optional
from baseopensdk import BaseClient
from baseopensdk.api.base.v1.resource.app_table_record import (
    ListAppTableRecordRequest,
    ListAppTableRecordResponse,
    BatchCreateAppTableRecordRequest,
    BatchCreateAppTableRecordResponse,
)
from requests.exceptions import RequestException
from .shared import paginate, batch_action
from .cell import ICell
from .const import (
    BASE_REQUEST_SUCCESS_CODE,
    MAX_GET_RECORDS_ONCE_LIMIT,
    MAX_CREATE_RECORDS_ONCE_LIMIT,
    MAX_DELETE_RECORDS_ONCE_LIMIT,
    MAX_UPDATE_RECORDS_ONCE_LIMIT,
)
from ..types import UserIdType


def get_base_table_records(
    table_id: str,
    base_client: BaseClient,
    page_size: int = MAX_GET_RECORDS_ONCE_LIMIT,
    user_id_type: UserIdType = UserIdType.open_id,
    field_names: Optional[list[str]] = None,
    automatic_fields: bool = True,
):
    """Get records from base table.

    Args:
        table_id (str): Base table id
        base_client (BaseClient): Base client
        page_size (int, optional): The number of one page. Defaults to 500.
        user_id_type (UserIdType, optional): UserId type. Defaults to UserIdType.open_id.
        field_names (Optional[list[str]], optional): Fields' names to get. Defaults to None.
        automatic_fields (bool, optional): If get automatic fields. Defaults to True.

    Raises:
        RequestException: Failed to get records

    Returns:
        List[AppTableRecord]: Records
    """
    req = (
        ListAppTableRecordRequest.builder()
        .table_id(table_id)
        .page_size(page_size)
        .user_id_type(user_id_type.value)
        .automatic_fields(automatic_fields)
    )
    if field_names:
        req.field_names(field_names)

    def get_records(page_token: str | None):
        if page_token is not None:
            req.page_token(page_token)
        res: ListAppTableRecordResponse = base_client.base.v1.app_table_record.list(
            req.build()
        )
        if res.code == BASE_REQUEST_SUCCESS_CODE:
            records = res.data.items or []
            return (res.data.page_token, records)
        raise RequestException(f"Failed to get records: {res.msg}")

    return paginate(get_records)


def add_records_to_base(
    table_id: str,
    base_client: BaseClient,
    record: list[IRecord],
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
    if res.code != BASE_REQUEST_SUCCESS_CODE:
        raise RequestException(f"Failed to add records: {res.msg}")
    return res.data.records


def batch_add_records_to_base(
    table_id: str,
    base_client: BaseClient,
    records: list[IRecord],
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


class IRecord(object):
    """Record Interface."""

    cells: dict[str, ICell] = {}
    index: Optional[tuple] = None
    id: Optional[str] = None
    created_time: Optional[float] = None
    modified_time: Optional[float] = None

    def __init__(
        self,
        cells: list[ICell],
        record_id: Optional[str] = None,
        index_field: Optional[list[str]] = None,
        created_time: Optional[float] = None,
        modified_time: Optional[float] = None,
    ):
        for cell in cells:
            self.set_cell(cell)
        if index_field is not None and len(index_field) > 0:
            self.set_index(index_field)
        self.created_time = created_time
        self.modified_time = modified_time
        self.id = record_id

    def get_cell_by_field_id(self, field_id: str) -> ICell | None:
        """Get cell by field name."""
        return self.cells.get(field_id)

    def set_index(self, index_field: Optional[list[str]] = None) -> tuple | None:
        """Get record index"""
        if index_field is None or len(index_field) == 0:
            self.index = None
        else:
            self.index = (self.get_cell_by_field_id(id).raw_value for id in index_field)
        return self.index

    def get_index_value(self, index_field: Optional[list[str]] = None) -> tuple | None:
        """Get index value"""
        if index_field is None or len(index_field) == 0:
            return None
        return tuple(self.get_cell_by_field_id(id).raw_value for id in index_field)

    def set_cell(self, cell: ICell) -> None:
        """Set cell"""
        self.cells[cell.field_id] = cell

    def get_cell(self, field_id: str) -> ICell | None:
        return self.cells.get(field_id)

    def to_app_record(self):
        """Convert to AppTableRecord"""
        fields = {
            cell.get_field().name: cell.to_bitable_value()
            for cell in self.cells.values()
            if cell.auto == False
        }
        return {"fields": fields}

    def __eq__(self, value: object) -> bool:
        if not isinstance(value, IRecord):
            return False
        return self.index == value.index
