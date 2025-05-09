from app.types import FieldType
from .core import BasicCellParserPlugin
from .types import CheckboxCellValue, CheckboxWriteValue, CheckboxParsedValue

DEFAULT_BOOL_VALUE = {
    "true": ["是", "True", "true", "TRUE", "1", "☑️"],
    "false": ["否", "False", "false", "FALSE", "0", ""],
}


class CheckboxCellParserPlugin(
    BasicCellParserPlugin[
        CheckboxCellValue | list[CheckboxCellValue],
        CheckboxParsedValue,
        CheckboxWriteValue,
    ]
):
    """Checkbox cell value translator"""

    field_type = [FieldType.Checkbox]
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
        bool_value = field.config.get("boolValue") or DEFAULT_BOOL_VALUE
        if isinstance(value, (bool, int, float)):
            return bool(value)
        if isinstance(value, str):
            return value in (bool_value.get("true") or bool_value.get("false"))
        return False

    def to_write_value(self, value, context, field):
        """Convert to write value"""
        return value
