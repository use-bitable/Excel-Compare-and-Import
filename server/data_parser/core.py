from __future__ import annotations
from abc import abstractmethod
from typing import List, Dict, IO, Set, Generator
from server.file import FileItem
from .exceptions import NotSupportDataType
from .types import CanPaginationData, BasicValueType, PaginationConfig, ParsedData


class DataParsePlugin[D: (IO, FileItem), RC: dict]:
    """Data parse plugin"""

    @property
    @abstractmethod
    def type(self) -> Set[str]: ...

    @property
    @abstractmethod
    def name(self) -> str: ...

    @abstractmethod
    def parse(
        self, data: D, config: RC, context: DataParser
    ) -> Generator[list[dict[str, BasicValueType]]]: ...

    @abstractmethod
    def preview(
        self, data: D, config: PaginationConfig[RC]
    ) -> CanPaginationData[ParsedData]:
        """Preview data source"""
        pass


class DataParser[D: (IO, FileItem), RC: dict]:
    def __init__(
        self, plugins: List[DataParsePlugin] = [], config: Dict[str, any] = {}
    ) -> None:
        self.config = config
        self.plugins: Dict[str, DataParsePlugin] = {}
        for plugin in plugins:
            self.register_plugin(plugin)

    def register_plugin(self, plugin: DataParsePlugin):
        for type in plugin.type:
            self.plugins[type] = plugin

    def parse(self, type: str, data: D, config: RC = None):
        if type not in self.plugins:
            raise NotSupportDataType(f"Can't find parser for {type}")
        return self.plugins[type].parse(data, config, self)

    def preview(self, type: str, data: D, config: PaginationConfig[RC] = None):
        if type not in self.plugins:
            raise NotSupportDataType(f"Can't find parser for {type}")
        return self.plugins[type].preview(data, config)

    @property
    def support_types(self) -> Set[str]:
        return set(self.plugins.keys())
