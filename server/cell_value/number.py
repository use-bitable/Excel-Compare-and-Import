import re
from decimal import Decimal
from server.types import FieldType
from .core import BasicCellParserPlugin
from .types import NumberCellValue


def parse_number_str(value: str):
    """Parse number str

    Example:
        1.23 => 1.23
        -1.23 => -1.23
        1.23% => 0.0123
        -1.23% => -0.0123
        1.23g => 1.23
        -1.23g => -1.23
        1,234 => 1234
        -1,234 => -1234
        1,234.56 => 1234.56
    """
    v = re.search(r"-?\d+\.?\d*%?", value.replace(",", "").replace(" ", ""))
    if v is None:
        return None
    v = v.group()
    if v.endswith("%"):
        return float(Decimal(v[:-1]) / Decimal("100"))
    return float(Decimal(v))


class NumberCellParserPlugin(
    BasicCellParserPlugin[NumberCellValue | list[NumberCellValue], int | float]
):
    """Number cell value translator"""

    field_type = [FieldType.Number]

    def parse_base_value(
        self,
        value,
        context,
        field=None,
    ):
        """Parse base cell value"""
        if isinstance(value, list):
            return value[0]
        if isinstance(value, (int, float)):
            return value
        return None

    def parse_data_value(self, value, context, field):
        """Parse base cell value"""
        if isinstance(value, (int, float)):
            return value
        if isinstance(value, str):
            return parse_number_str(value)
        return None
