from server.file import FileItem
from server.data_parser.core import DataParsePlugin
from .types import ReadXLSConfig
from .read_xls import *
from .constants import SUPPORTED_TYPES


class XLSParser(DataParsePlugin[FileItem, ReadXLSConfig]):
    type = SUPPORTED_TYPES
    name = "XLS Parser"

    def parse(self, data, config, context):
        return iter_row_xls(data, config)

    def preview(self, data, config):
        return paginate_load_xls(data, config, parse_data=True)
