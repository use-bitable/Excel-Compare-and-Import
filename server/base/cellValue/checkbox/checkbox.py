#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Checkbox cell value translator

from typing import Optional
from ..core import TranslatorOption, FieldRole
from ...field import FieldType, IField
from ...const import DEFAULT_BOOL_VALUE
from ....types import RawValueType

def checkbox_normalize(
    value: RawValueType,
    field: IField,
    ns: Optional[str] = None
):
    """Checkbox normalize"""
    config = field.config
    boolValue = DEFAULT_BOOL_VALUE
    if config is not None:
        boolValue = config.get("boolValue", DEFAULT_BOOL_VALUE)
    if not isinstance(value, bool):
        str_value = str(value)
        if str_value in boolValue.get("true", []):
            return True
        if str_value in boolValue.get("false", []):
            return False
        return None
    return value

def checkbox_to_bitable_value(value: Optional[bool], _: IField, __: Optional[str]):
    return value
    


CHECKBOX_TRANSLATOR = TranslatorOption(
    field_type=FieldType.Checkbox,
    roles=[FieldRole.NORMAL, FieldRole.INDEXABLE],
    normalize=checkbox_normalize,
    to_bitable_value=checkbox_to_bitable_value,
)