from __future__ import annotations
from abc import abstractmethod
from typing import List, Dict, IO, Set
from server.file import FileItem
from .types import CanPaginationData, PreviewConfig, BasicValueType

class DataParsePlugin[D: (IO, FileItem), C: dict]:
    """Data parse plugin"""

    @property
    @abstractmethod
    def type(self) -> Set[str]:...

    @property
    @abstractmethod
    def name(self) -> str:...
    
    @abstractmethod
    def parse(self, data: D, config: C, context: DataParser) -> list[dict[str, BasicValueType]]:...
    
    @abstractmethod
    def can_parse(self, data: D, config: C) -> bool:...
    
    @abstractmethod
    def preview(self, data: D, config: PreviewConfig[C]) -> CanPaginationData[list[list]]:
      """Preview data source"""
      pass

    @abstractmethod
    def get_info(self, data: D, config: C):
        """Get data source info (SheetNames, FieldNames etc)."""
        pass


class DataParser:
    def __init__(
            self,
            plugins: List[DataParsePlugin] = [],
            config: Dict[str, any] = {}
    ) -> None:
        self.config = config
        self.plugins: Dict[str, DataParsePlugin] = {}
        for plugin in plugins:
            self.register_plugin(plugin)

    def register_plugin(self, plugin: DataParsePlugin):
        for type in plugin.type:
            self.plugins[type] = plugin
    
    def parse(self, type: str, data: IO | str, config: any):
        if type not in self.plugins:
            raise ValueError(f"Can't find parser for {type}")
        return self.plugins[type].parse(data, config, self)
