#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Single link value translator

from typing import Optional
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField
from ..shared import unique
from ..const import DEFAULT_SEPARATOR
from ...types import RawValueType

def link_normalize(
        value: RawValueType,
        field: IField,
        ns: str,
):
    """Normalize link value"""
    if value is None:
        return None
    if not isinstance(value, str):
        value = str(value)
    separator = DEFAULT_SEPARATOR
    config = field.config
    if config is not None:
        separator = config.get("separator", DEFAULT_SEPARATOR) or DEFAULT_SEPARATOR
    values = value.split(separator)
    return unique(values)

def link_to_bitable_value(
        value: Optional[list[str]],
        _: IField,
        __: str,
):
    return value


SINGLE_LINK_TRANSLATOR = TranslatorOption(
    field_type=FieldType.DuplexLink,
    roles=[
        FieldRole.NORMAL,
        FieldRole.LINK,
    ],
    normalize=link_normalize,
    to_bitable_value=link_to_bitable_value,
)