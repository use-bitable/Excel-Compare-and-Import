import re
from server.types import FieldType
from .core import BasicCellParserPlugin
from .types import PhoneCellValue

PHONE_LENGTH_LIMIT = 64
PHONE_REGEX = "(+)?\d*"


def parse_phone_str(value: str):
    """Phone normalize"""
    v = re.search(r"(\+)?\d*", value)
    if v is None:
        return None
    v = v.group()
    if len(v) > PHONE_LENGTH_LIMIT:
        return v[:PHONE_LENGTH_LIMIT]
    return v


class PhoneCellParserPlugin(
    BasicCellParserPlugin[PhoneCellValue | list[PhoneCellValue], str]
):
    """Phone cell value translator"""

    field_type = [FieldType.Phone]
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
        if isinstance(value, (int, float)):
            value = str(value)
        if isinstance(value, str):
            return parse_phone_str(value)
        return None

    def to_index(self, value):
        return value
