#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Number cell translator

import re
from decimal import Decimal
from typing import Optional
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField
from ...types import RawValueType

def parse_number_str(value: str):
    """Parse number"""
    v = re.search(r"-?\d+\.?\d*%?", value)
    if v is None:
        return None
    v = v.group()
    if v.endswith("%"):
        return str(Decimal(value[:-1]) / Decimal("100"))
    return str(Decimal(value))

def number_normalize(
        value: RawValueType,
        _: IField,
        __: Optional[str] = None
):
    """Number normalize"""
    if isinstance(value, object):
        return None
    if isinstance(value, str):
        try:
            return parse_number_str(value)
        except ValueError:
            return None
    if isinstance(value, int) or isinstance(value, float):
        return str(value)
    if isinstance(value, bool):
        return str(int(value))
    return value

def number_to_bitable_value(
        value: Optional[str],
        _: IField,
        __: Optional[str]
):
    """Number to bitable value"""
    if value is None:
        return None
    return float(value)

NUMBER_TRANSLATOR = TranslatorOption(
    field_type=FieldType.Number,
    roles=[FieldRole.NORMAL, FieldRole.INDEXABLE],
    normalize=number_normalize,
    to_bitable_value=number_to_bitable_value,
)
