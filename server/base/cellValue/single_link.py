#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Single link value translator

from typing import Optional, Set
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField
from ..const import DEFAULT_SEPARATOR
from ...types import RawValueType, LinkValueType

def link_normalize(
        value: RawValueType | LinkValueType,
        field: IField,
        ns: str,
):
    """Normalize link value"""
    if value is None:
        return None
    if isinstance(value, dict):
        ids = value.get("link_record_ids", None)
        return set(ids) if ids is not None else None
    if not isinstance(value, str):
        value = str(value)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    separator = DEFAULT_SEPARATOR
    config = field.config
    if config is not None:
        separator = config.get("separator", DEFAULT_SEPARATOR) or DEFAULT_SEPARATOR
    values = value.split(separator)
    return set(values)

def link_to_bitable_value(
        value: Optional[Set[str]],
        _: IField,
        __: str,
):
    if value is None:
        return None
    return list(value)


SINGLE_LINK_TRANSLATOR = TranslatorOption(
    field_type=FieldType.SingleLink,
    roles=[
        FieldRole.NORMAL,
        FieldRole.LINK,
    ],
    normalize=link_normalize,
    to_bitable_value=link_to_bitable_value,
)