from typing import Optional, TypedDict
from server.types import FieldType
from .core import BasicCellParserPlugin
from .types import UrlCellValue, UrlWriteValue, UrlParsedValue


class UrlCellParserPlugin(
    BasicCellParserPlugin[
        UrlCellValue | list[UrlCellValue], UrlParsedValue, UrlWriteValue
    ]
):
    """Url cell value translator"""

    field_type = [FieldType.Url]
    indexable = True

    def parse_base_value(
        self,
        value,
        context,
        field=None,
    ):
        """Parse base cell value"""
        if isinstance(value, list):
            return value[0]
        return value

    def parse_data_value(self, value, context, field):
        """Parse base cell value"""
        if value is None or isinstance(value, list):
            return None
        if isinstance(value, str):
            return {
                "text": value,
                "link": value,
            }
        if isinstance(value, dict):
            return {
                "text": value.get("text"),
                "link": value.get("url"),
            }
        return {
            "text": str(value),
            "link": str(value),
        }

    def to_write_value(self, value, context, field):
        """Convert to write value"""
        return value
