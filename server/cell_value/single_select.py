from server.types import FieldType
from .core import BasicCellParserPlugin
from .types import SingleSelectCellValue


class SingleSelectCellParserPlugin(
    BasicCellParserPlugin[SingleSelectCellValue | list[SingleSelectCellValue], str]
):
    """Single select cell value translator"""

    field_type = [FieldType.SingleSelect]
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
        if isinstance(value, (int, float, bool)):
            return str(value)
        if isinstance(value, str):
            return value
        if isinstance(value, dict):
            return value.get("text")
        return None
