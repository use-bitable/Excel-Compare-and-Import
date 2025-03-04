#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Cell value module core

from __future__ import annotations
from enum import Enum
from dataclasses import dataclass, field
from typing import Callable, Optional
from baseopensdk import BaseClient
from ..progress import OnProgressFunc
from ..exception import FieldConversionException
from ..shared import singleton, iter_run
from ..field import IField
from ..field_type import FieldType
from ...types import RawValueType


class FieldRole(Enum):
    """Field Role"""
    AUTO = "auto"
    ASYNC = "async"
    NORMAL = "normal"
    INDEXABLE = "indexable"
    LINK = "link"

@singleton
class CellTranslator:
    """Cell translator"""
    normalize: dict[FieldType, NormalizeFunc] = {}
    async_methods: dict[FieldType, AsyncDataFunc] = {}
    to_bitable_value_methods: dict[FieldType, NormalizeFunc] = {}
    support_types: set[FieldType] = set()
    auto_types: set[FieldType] = set()
    async_types: set[FieldType] = set()
    index_types: set[FieldType] = set()
    link_types: set[FieldType] = set()
    reset_list: list[BasicNPFunc] = []
    refresh_list: list[BasicNPFunc] = []

    def __init__(self, translators: list[TranslatorOption]) -> None:
        for translator in translators:
            self.registry_translator(translator)

    def parse(self, field: IField, value: RawValueType, ns: str):
        """Translate cell"""
        field_type = field.type
        if field_type not in self.support_types:
            return value
        if value is None:
            return None
        try:
            cell_value = self.normalize[field_type](value, field, ns)
            return cell_value
        except Exception as e:
            raise FieldConversionException(field, value, str(e))

    def to_bitable_value(self, field: IField, value: RawValueType, ns: str):
        """Translate cell"""
        field_type = field.type
        if field_type not in self.support_types:
            return value
        if value is None:
            return None
        try:
            cell_value = self.to_bitable_value_methods[field_type](value, field.config, ns)
            return cell_value
        except Exception as e:
            raise FieldConversionException(field, value, str(e))

    def registry_translator(self, translator: TranslatorOption):
        """Registry translator"""
        normalize = translator.normalize
        to_bitable_value = translator.to_bitable_value
        if normalize is None or to_bitable_value is None:
            return
        field_type = translator.field_type
        if field_type is None or field_type in self.support_types:
            return
        self.support_types.add(field_type)
        self.normalize[field_type] = normalize
        self.to_bitable_value_methods[field_type] = to_bitable_value
        roles = translator.roles
        if FieldRole.AUTO in roles:
            self.auto_types.add(field_type)
        if FieldRole.ASYNC in roles:
            self.async_types.add(field_type)
        if FieldRole.INDEXABLE in roles:
            self.index_types.add(field_type)
        if FieldRole.LINK in roles:
            self.link_types.add(field_type)
        reset = translator.reset
        if isinstance(reset, Callable):
            self.reset_list.append(reset)
        refresh = translator.refresh
        if isinstance(refresh, Callable):
            self.refresh_list.append(refresh)
        async_method = translator.async_method
        if isinstance(async_method, Callable):
            self.async_methods[field_type] = async_method

    def async_data(
            self,
            ns: str,
            base_client: BaseClient,
            field: IField,
            on_progress: Optional[OnProgressFunc]=None,
            on_error: Optional[OnErrorFunc]=None
    ):
        """Async data"""
        field_type = field.type
        if field_type not in self.async_methods:
            return
        async_method = self.async_methods[field_type]
        return async_method(ns, base_client, field, on_progress, on_error)

    def refresh(self, ns: str):
        iter_run(self.refresh_list, ns)

    def reset(self, ns: str):
        iter_run(self.reset_list, ns)

type NormalizeFunc[T, R] = Callable[[T, IField, Optional[str]], R]
type BasicNPFunc = Callable[[str], None]
type RefreshFunc = BasicNPFunc
type ResetFunc = BasicNPFunc
type OnErrorFunc = Callable[[Exception], None]
type AsyncDataFunc[R] = Callable[[str, BaseClient, IField, OnProgressFunc, OnErrorFunc], R]


@dataclass
class TranslatorOption[T, R, B, M]:
    """Translator Option"""
    field_type: FieldType
    normalize: NormalizeFunc[T, R]
    to_bitable_value: Optional[NormalizeFunc[R, B]]=None
    roles: list[FieldRole] = field(default_factory=lambda: [FieldRole.NORMAL])
    refresh: Optional[RefreshFunc] = None
    reset: Optional[ResetFunc] = None
    async_method: Optional[AsyncDataFunc[M]] = None
