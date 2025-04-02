from server.file import FileItem
from server.data_parser.core import DataParsePlugin
from .types import ReadCSVConfig
from .read_csv import *
from .constants import SUPPORTED_TYPES


class CSVParser(DataParsePlugin[FileItem, ReadCSVConfig]):
    type = SUPPORTED_TYPES
    name = "CSV Parser"

    def parse(self, data, config, context):
        return iter_row_csv(data, config)

    def preview(self, data, config):
        return paginate_load_csv(data, config, parse_data=True)
