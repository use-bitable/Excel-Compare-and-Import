#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: User cell value translator

from typing import Sequence, Optional, Set
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField
from ..const import USER_NUM_IN_CELL_LIMIT, DEFAULT_SEPARATOR
from ...types import RawValueType, UserValueType



def user_normalize(
    value: RawValueType | list[UserValueType],
    field: IField,
    ns: Optional[str] = None
):
    """User normalize"""
    if isinstance(value, list):
        users: Set[str] = set()
        for item in value:
            if isinstance(item, dict):
                id = item.get("id", None)
                if id is not None:
                    users.add(id)
            else:
                users.add(str(item))
        return users
    separator = DEFAULT_SEPARATOR
    config = field.config
    if config is not None:
        separator = config.get("separator", DEFAULT_SEPARATOR) or DEFAULT_SEPARATOR
    try:
        return set(str(value).split(separator))
    except Exception:
        return None
    
def user_to_bitable_value(value: Optional[Sequence[str]], field: IField, ns: Optional[str])  -> Optional[Sequence[UserValueType]]:
    if value is None or len(value) == 0:
        return None
    multiple = field.property.multiple
    if multiple:
        allowed_values = list(value)[:min(USER_NUM_IN_CELL_LIMIT, len(value))]
        return [{"id": id} for id in allowed_values]
    return [{"id": value[0]}]
    


USER_TRANSLATOR = TranslatorOption(
    field_type=FieldType.User,
    roles=[FieldRole.NORMAL],
    normalize=user_normalize,
    to_bitable_value=user_to_bitable_value,
)
