from app.types import FieldType
from .core import BasicCellParserPlugin
from .types import FormulaOrLookupCellValue, FormulaOrLookupParsedValue
from .exceptions import NotWritableFieldTypeException


class FormulaOrLookupCellParserPlugin(
    BasicCellParserPlugin[FormulaOrLookupCellValue, FormulaOrLookupParsedValue, None]
):
    """Formula or Lookup cell value translator"""

    field_type = [FieldType.Formula, FieldType.Lookup]
    indexable = True

    def parse_base_value(
        self,
        value,
        context,
        field=None,
    ):
        """Parse base cell value"""
        return (
            str(
                context.parse_base_value(
                    FieldType(value.get("type")), None, value.get("value")
                )
            )
            if value
            else None
        )

    def parse_data_value(self, value, context, field):
        """Parse base cell value"""
        if isinstance(value, str):
            return value
        if isinstance(value, dict):
            return value.get("text")
        if isinstance(value, (int, float, bool)):
            return str(value)
        return None

    def to_write_value(self, value, context, field):
        """Convert to write value"""
        raise NotWritableFieldTypeException(
            "Formula or Lookup cell value cannot be written"
        )
