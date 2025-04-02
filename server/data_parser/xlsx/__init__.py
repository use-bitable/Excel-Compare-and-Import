from server.file import FileItem
from .read_xlsx import *
from .constants import SUPPORTED_TYPES
from .types import ReadXLSXConfig
from ..core import DataParsePlugin


class XLSXParser(DataParsePlugin[FileItem, ReadXLSXConfig]):
    type = SUPPORTED_TYPES
    name = "XLSX Parser"

    def parse(self, data, config, context):
        return iter_row_xlsx(data, config)

    def preview(self, data, config):
        return paginate_load_xlsx(data, config, parse_data=True)
