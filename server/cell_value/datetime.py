import arrow
from decimal import Decimal
from server.types import FieldType
from .core import BasicCellParserPlugin
from .types import DatetimeCellValue, DatetimeWriteValue, DatetimeParsedValue

DEFAULT_DATETIME_FORMAT = ["YYYY/MM/DD"]


def parse_datetime_str(value: str, format: str | list[str] = DEFAULT_DATETIME_FORMAT):
    """Datetime normalize"""
    try:
        timestamp = arrow.get(value, format).timestamp()
        timestamp_str = str(timestamp)
        return int(Decimal(timestamp_str) * Decimal("1000"))
    except Exception:
        return None


class DatetimeParserPlugin(
    BasicCellParserPlugin[
        DatetimeCellValue | list[DatetimeCellValue],
        DatetimeParsedValue,
        DatetimeWriteValue,
    ]
):
    """Datetime cell value translator"""

    field_type = [FieldType.DateTime]
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
        if isinstance(value, (float, bool, int)):
            return int(value)
        format = (
            field.config.get("format") or DEFAULT_DATETIME_FORMAT
            if field.config
            else DEFAULT_DATETIME_FORMAT
        )
        if isinstance(value, str):
            return parse_datetime_str(value, format)
        return None

    def to_write_value(self, value, context, field):
        """Convert to write value"""
        return value
