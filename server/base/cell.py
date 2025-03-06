#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Cell module

from __future__ import annotations
from .field import IField
from .cellValue import CELL_PARSER
from ..types import RawValueType


class ICell(object):
    """Interface for cell"""

    __field: IField
    raw_value: RawValueType
    auto: bool = False

    def __init__(self, field: IField, ns: str, value: RawValueType) -> None:
        self.__field = field
        self.raw_value = CELL_PARSER.parse(field, value, ns)
        self.auto = field.auto

    def get_field(self) -> IField:
        return self.__field

    def to_bitable_value(self, ns: str):
        return CELL_PARSER.to_bitable_value(self.raw_value, self.get_field(), ns)

    def __eq__(self, obj: object) -> bool:
        if not isinstance(obj, ICell):
            return self.raw_value == obj
        return self.raw_value == obj.raw_value
