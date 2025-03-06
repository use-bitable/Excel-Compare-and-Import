from io import FileIO
from server.file import FileItem
from .read_xlsx import preview_xlsx
from .constants import SUPPORTED_TYPES
from .config import ReadXLSXConfig
from ..core import DataParsePlugin

class XLSXParser(DataParsePlugin[FileItem, ReadXLSXConfig]):
    type = SUPPORTED_TYPES
    name = "XLSX Parser"

    def parse(self, data, config, context):
        return super().parse(data, config, context)
    
    def can_parse(self, data, config):
        return super().can_parse(data, config)
    
    def preview(self, data, config):
        return preview_xlsx(data, config)
    
    def get_info(self, data, config):
        return super().get_info(data, config)
