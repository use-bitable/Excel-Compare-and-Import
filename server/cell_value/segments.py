from __future__ import annotations
from server.types import FieldType, FieldUIType
from .core import BasicCellParserPlugin
from .types import SegmentsCellValue, SegmentsWriteValue, SegmentsParsedValue


def parse_text(value: SegmentsCellValue):
    return "".join([i.get("text") for i in value])


class SegmentsCellParserPlugin(
    BasicCellParserPlugin[SegmentsCellValue, SegmentsParsedValue, SegmentsWriteValue]
):
    """Segments cell value translator"""

    field_type = [FieldType.Segments]
    indexable = True

    def parse_base_value(
        self,
        value,
        context,
        field=None,
    ):
        """Parse base cell value"""
        if value is None or not isinstance(value, list):
            return None
        if field.ui_type == FieldUIType.Email:
            return value[0].get("text")
        return parse_text(value)

    def parse_data_value(self, value, context, field):
        """Parse base cell value"""
        if value is None or isinstance(value, list):
            return None
        if isinstance(value, dict):
            return value.get("text") if value.get("type") == "url" else None

    def to_write_value(self, value, context, field):
        return value
