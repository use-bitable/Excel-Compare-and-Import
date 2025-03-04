#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Url cell value translator

from typing import Optional
from .core import TranslatorOption, FieldRole
from ..field import FieldType, IField
from ...types import RawValueType, UrlValueType

def url_normalize(
    value: RawValueType,
    _: IField,
    __: Optional[str] = None
):
    """Url normalize"""
    return str(value)


def url_to_bitable_value(value: Optional[str], _: IField, __: Optional[str]) -> Optional[UrlValueType]:
    if value is None:
        return None
    return {
        "link": value,
        "text": value
    }


URL_TRANSLATOR = TranslatorOption(
    field_type=FieldType.Url,
    roles=[FieldRole.NORMAL, FieldRole.INDEXABLE],
    normalize=url_normalize,
    to_bitable_value=url_to_bitable_value,
)
