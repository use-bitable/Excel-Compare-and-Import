#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Fields module

from __future__ import annotations
from enum import Enum
from typing import Optional, TypedDict, NotRequired
from baseopensdk import BaseClient
from baseopensdk.api.base.v1.resource.app_table_field import \
   ListAppTableFieldRequest, ListAppTableFieldResponse
from baseopensdk.api.base.v1.model.app_table_field_for_list import AppTableFieldForList
from baseopensdk.api.base.v1.model.app_table_field_property import AppTableFieldProperty
from requests.exceptions import RequestException
from .shared import paginate
from .const import AUTO_FIELD_TYPES
from .field_config import FieldConfig, LinkConfig
from .field_type import FieldType, FieldUIType

def get_base_fields(
        table_id: str,
        base_client: BaseClient,
        text_field_as_array: bool = False,
        view_id: Optional[str] = None,
        page_size: int = 100,):
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
        req = ListAppTableFieldRequest.builder()\
            .table_id(table_id)\
            .page_size(page_size)\
            .text_field_as_array(text_field_as_array)
        if page_token:
            req.page_token(page_token)
        if view_id:
            req.view_id(view_id)
        res: ListAppTableFieldResponse = base_client.base.v1.app_table_field.list(req.build())
        if res.code != 0:
            raise RequestException(f"Failed to get fields: {res.msg}")
        data = res.data
        items = data.items or []
        return (data.page_token, items)
    return paginate(get_fields)


class FieldMap(TypedDict):
    """Field map model."""
    id: str
    source_field: Optional[str]
    config: NotRequired[Optional[FieldConfig]]
    link_config: NotRequired[Optional[LinkConfig]]

class IField(object):
    """Field interface."""
    name: str
    id: str
    type: FieldType
    ui_type: FieldUIType
    is_primary: bool
    property: AppTableFieldProperty
    config: Optional[FieldConfig]=None
    link_config: Optional[LinkConfig]=None
    source_field: Optional[str]=None
    linked_table_id: Optional[str]=None
    auto: bool=False

    def __init__(
            self,
            base_field: AppTableFieldForList,
            field_map: Optional[FieldMap]=None,
    ) -> None:
        self.name = base_field.field_name
        self.id = base_field.field_id
        self.type = FieldType(base_field.type)
        self.ui_type = FieldUIType(base_field.ui_type)
        self.property = base_field.property
        self.is_primary = base_field.is_primary
        if not field_map is None:
            self.config = field_map.config
            self.source_field = field_map.source_field
            self.link_config = field_map.get("link_config")
        if not base_field.property.table_id is None:
            self.linked_table_id = base_field.property.table_id
        if self.type in AUTO_FIELD_TYPES:
            self.auto = True

    def __str__(self):
        return f"Field: {self.name}({self.ui_type} Field)"
