#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Segments cell value translator

from typing import Optional
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField, FieldUIType
from ..const import TEXT_CHAR_NUM_LIMIT
from ...types import RawValueType, SegmentsValueType

def check_str(value: str, ui_type: FieldType):
    if ui_type == FieldUIType.Text:
        if len(value) > TEXT_CHAR_NUM_LIMIT:
            raise ValueError(f"Too long text(Number of chars in text should <= {TEXT_CHAR_NUM_LIMIT}): {value}")
        return value
    return value

def segments_normalize(
    value: RawValueType | SegmentsValueType,
    _: IField,
    __: Optional[str] = None
):
    """Segments normalize"""
    if isinstance(value, str):
        return value
    if isinstance(value, list):
        return ''.join([(str(x) if not isinstance(x, dict) else x.get("text")) for x in value])
    try:
        return str(value)
    except ValueError:
        return None
    
def segments_to_bitable_value(
        value: Optional[str],
        field: IField,
        ns: str
):
    if value is None:
        return None
    return check_str(value, field.ui_type)


SEGMENTS_TRANSLATOR = TranslatorOption(
    field_type=FieldType.Segments,
    roles=[FieldRole.NORMAL, FieldRole.INDEXABLE],
    normalize=segments_normalize,
    to_bitable_value=segments_to_bitable_value,
)