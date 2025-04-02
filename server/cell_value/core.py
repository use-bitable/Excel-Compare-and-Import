from __future__ import annotations
from abc import abstractmethod
from typing import Callable, Optional
from baseopensdk import BaseClient
from server.base.field import IBaseField
from server.data_parser.types import BasicValueType
from server.types import FieldType, RawValueType
from .types import BaseCellValue
from .exceptions import NotSupportFieldTypeException


class BasicCellParserPlugin[BV: BaseCellValue, PV]:
    """Cell parser plugin"""

    @property
    @abstractmethod
    def field_type(self) -> list[FieldType]:
        """Field type"""
        pass

    @property
    @abstractmethod
    def indexable(self) -> bool:
        """Is indexable"""
        pass

    @abstractmethod
    def parse_base_value(
        self,
        value: Optional[BV],
        context: CellTranslator,
        field: Optional[IBaseField] = None,
    ) -> Optional[PV]:
        """Parse base cell value"""
        pass

    @abstractmethod
    def parse_data_value(
        self, value: BasicValueType, context: CellTranslator, field: IBaseField
    ) -> Optional[PV]:
        """Parse base cell value"""
        pass


class CellTranslator:
    """Cell translator"""

    _plugins: dict[FieldType, BasicCellParserPlugin] = {}
    """Plugins registry"""

    def __init__(self, plugins: list[BasicCellParserPlugin]):
        """Initialize cell translator"""
        for plugin in plugins:
            self.registry_plugin(plugin)

    def parse_base_value(
        self, type: FieldType, field: Optional[IBaseField], value: BaseCellValue
    ) -> RawValueType:
        """Translate cell"""
        if type not in self._plugins:
            raise NotSupportFieldTypeException(
                f"Field type {type} not support: {field}"
            )
        plugin = self._plugins[type]
        try:
            return plugin.parse_base_value(value, self, field)
        except Exception as e:
            raise NotSupportFieldTypeException(
                f"Parse base cell value for {field} error: {e}"
            ) from e

    def parse_data_value(self, field: IBaseField, value: BasicValueType):
        """Translate cell"""
        field_type = field.type
        if field_type not in self._plugins:
            raise NotSupportFieldTypeException(
                f"Field type {field_type} not support: {field}"
            )
        plugin = self._plugins[field_type]
        try:
            return plugin.parse_data_value(value, self, field)
        except Exception as e:
            raise NotSupportFieldTypeException(
                f"Parse data cell value for {field} error: {e}"
            ) from e

    def registry_plugin(self, plugin: BasicCellParserPlugin):
        """Registry translator"""
        types = plugin.field_type
        for type in types:
            self._plugins[type] = plugin


type NormalizeFunc[T, R] = Callable[[T, IBaseField, Optional[str]], R]
type BasicNPFunc = Callable[[str], None]
type RefreshFunc = BasicNPFunc
type ResetFunc = BasicNPFunc
type OnErrorFunc = Callable[[Exception], None]
type AsyncDataFunc[R] = Callable[[str, BaseClient, IBaseField, OnErrorFunc], R]
