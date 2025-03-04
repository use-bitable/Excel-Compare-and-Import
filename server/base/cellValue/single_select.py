#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: SingleSelect cell value translator

from typing import Optional
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField
from ...types import RawValueType

def single_select_normalize(
    value: RawValueType,
    field: IField,
    ns: Optional[str] = None
):
    """Segments normalize"""
    if isinstance(value, str):
        return value
    try:
        return str(value)
    except ValueError:
        return None
    
def single_select_to_bitable_value(value: Optional[str], field: IField, ns: Optional[str] = None):
    if value is None:
        return None
    return value


SINGLE_SELECT_TRANSLATOR = TranslatorOption(
    field_type=FieldType.SingleSelect,
    roles=[FieldRole.NORMAL, FieldRole.INDEXABLE],
    normalize=single_select_normalize,
    to_bitable_value=single_select_to_bitable_value,
)