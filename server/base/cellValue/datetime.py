#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Datetime cell value translator

import arrow
from typing import Optional
from decimal import Decimal
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField
from ...types import RawValueType

DEFAULT_DATETIME_FORMAT = 'YYYY/MM/DD'

def datetime_normalize(
    value: RawValueType,
    field: IField,
    ns: Optional[str] = None
):
    """Datetime normalize"""
    config = field.config
    format = DEFAULT_DATETIME_FORMAT
    if config is not None:
        format = config.get("format", DEFAULT_DATETIME_FORMAT)
    if isinstance(value, str):
        try:
            timestamp = arrow.get(value, format).timestamp()
            timestamp_str = str(timestamp)
            return float(Decimal(timestamp_str) * Decimal("1000"))
        except Exception:
            return None
    if isinstance(value, bool):
        return int(value)
    if isinstance(value, int) or isinstance(value, float):
        return value
    
def datetime_to_bitable_value(value: Optional[float], _: IField, __: Optional[str]):
    return value


DATETIME_TRANSLATOR = TranslatorOption(
    field_type=FieldType.DateTime,
    roles=[FieldRole.NORMAL, FieldRole.INDEXABLE],
    normalize=datetime_normalize,
    to_bitable_value=datetime_to_bitable_value,
)