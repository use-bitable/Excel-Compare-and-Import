#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: MultiSelect cell value translator

from typing import Optional, Set
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField
from ..const import DEFAULT_SEPARATOR, OPTIONS_IN_CELL_LIMIT
from ..shared import unique
from ...types import RawValueType

def multi_select_normalize(
    value: RawValueType,
    field: IField,
    _: Optional[str] = None
):
    """Segments normalize"""
    config = field.config
    separator = DEFAULT_SEPARATOR
    if config is not None:
        separator = config.get("separator", DEFAULT_SEPARATOR)
    try:
        return set(str(value).split(separator))
    except ValueError:
        return None


def multi_select_to_bitable_value(
        value: Optional[Set[str]],
        _: IField,
        __: Optional[str]
):
    if value is None:
        return None
    allowed_values = unique(list(value))[:min(OPTIONS_IN_CELL_LIMIT, len(value))]
    return allowed_values


MULTISELECT_TRANSLATOR = TranslatorOption(
    field_type=FieldType.MultiSelect,
    roles=[FieldRole.NORMAL, FieldRole.INDEXABLE],
    normalize=multi_select_normalize,
    to_bitable_value=multi_select_to_bitable_value,
)
