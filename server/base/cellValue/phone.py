#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Phone cell value translator

import re
from typing import Optional
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField
from ..const import PHONE_LENGTH_LIMIT
from ...types import RawValueType

def phone_normalize(
    value: RawValueType,
    _: IField,
    __: Optional[str] = None
):
    """Phone normalize"""
    if not isinstance(value, str) and not isinstance(value, int):
        return None
    phone = re.search(r"(\+)?\d*",str(value))
    if phone is None or len(phone.group()) > PHONE_LENGTH_LIMIT:
        raise ValueError(f"Invalid phone number: {value}")
    return phone.group()


def phone_to_bitable_value(value: Optional[str], _: IField, __: Optional[str]):
    """Phone to bitable value"""
    if value is None:
        return None
    return value



PHONE_TRANSLATOR = TranslatorOption(
    field_type=FieldType.Phone,
    roles=[FieldRole.NORMAL, FieldRole.INDEXABLE],
    normalize=phone_normalize,
    to_bitable_value=phone_to_bitable_value,
)
