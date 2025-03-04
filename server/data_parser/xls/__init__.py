from typing import IO
from werkzeug.datastructures import FileStorage
from server.base import ITable
from server.data_parser.core import DataParser, DataParsePlugin
from .constants import SUPPORTED_TYPES

class XLSParser(DataParsePlugin):
    type = SUPPORTED_TYPES
    name = "XLS Parser"

    def parse(self, data: FileStorage | IO, config: any, context: DataParser) -> ITable:
        return super().parse(data, config, context)
    
    def can_parse(self, type):
        return type in self.type
    
    def preview(self, data, config):
        return super().preview(data, config)
