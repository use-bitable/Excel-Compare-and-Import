#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Fields module

from __future__ import annotations
import app.base
import app.base.cell
from enum import Enum
from typing import Optional, TypedDict, NotRequired
from baseopensdk import BaseClient
from baseopensdk.api.base.v1.resource.app_table_field import (
    ListAppTableFieldRequest,
    ListAppTableFieldResponse,
)
from baseopensdk.api.base.v1.model.app_table_field_for_list import AppTableFieldForList
from baseopensdk.api.base.v1.model.app_table_field_property import AppTableFieldProperty
from app.types import FieldType, FieldUIType
from .const import AUTO_FIELD_TYPES, MAX_LIST_FIELDS_LIMIT
from .field_config import FieldConfig, LinkConfig
from .exceptions import ListFieldsException


def get_base_fields(
    table_id: str,
    base_client: BaseClient,
    text_field_as_array: bool = False,
    view_id: Optional[str] = None,
    page_size: int = MAX_LIST_FIELDS_LIMIT,
):
    """Get table fields.

    Args:
        table_id (str): Table ID
        base_client (BaseClient): Base client
        text_field_as_array (bool, optional): If description of field in array format.
         Defaults to False.
        view_id (str | None, optional): View ID. Defaults to None.
        page_size (int, optional): Page size. Defaults to 100.
    """

    def get_fields(page_token: Optional[str] = None):
        req = (
            ListAppTableFieldRequest.builder()
            .table_id(table_id)
            .page_size(page_size)
            .text_field_as_array(text_field_as_array)
        )
        if page_token:
            req.page_token(page_token)
        if view_id:
            req.view_id(view_id)
        res: ListAppTableFieldResponse = base_client.base.v1.app_table_field.list(
            req.build()
        )
        if not res.success():
            raise ListFieldsException(f"Error[{res.code}]: {res.msg}")
        data = res.data
        items = data.items or []
        return (data.page_token, items, data.has_more, data.total)

    return get_fields


class FieldMap(TypedDict):
    """Field map model."""

    id: str
    source_field: Optional[str]
    config: NotRequired[Optional[FieldConfig]]
    link_config: NotRequired[Optional[LinkConfig]]
    has_children: NotRequired[bool]
    children: NotRequired[list[FieldMap]]


class IBaseField(object):
    """Field interface."""

    name: str
    id: str
    type: FieldType
    ui_type: FieldUIType
    is_primary: bool
    property: AppTableFieldProperty
    children: Optional[list[FieldMap]]
    config: Optional[FieldConfig] = None
    link_config: Optional[LinkConfig] = None
    source_field: Optional[str] = None
    auto: bool = False

    def __init__(
        self,
        parent: app.base.table.IBaseTable,
        base_field: AppTableFieldForList,
        field_map: Optional[FieldMap] = None,
    ) -> None:
        self.name = base_field.field_name
        self.id = base_field.field_id
        self.type = FieldType(base_field.type)
        self.ui_type = FieldUIType(base_field.ui_type)
        self.property = base_field.property
        self.is_primary = base_field.is_primary
        if field_map is not None:
            self.config = field_map.config
            self.source_field = field_map.source_field
            self.link_config = field_map.get("link_config")
            self.children = field_map.get("children")
        self.auto = self.type in AUTO_FIELD_TYPES
        self.parent = parent

    def get_table(self):
        """Get table."""
        return self.parent

    def create_cell(self, value):
        """Create cell."""
        return app.base.cell.ICell.create_cell(value, self)

    def __str__(self):
        return f"IBaseField(name={self.name} type={self.type} ui_type={self.ui_type})"
