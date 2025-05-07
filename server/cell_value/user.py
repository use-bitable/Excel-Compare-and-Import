from server.types import FieldType
from .core import BasicCellParserPlugin
from .types import UserCellValue, UserWriteValue, HasIdWriteItem, UserParsedValue

USER_NUM_IN_CELL_LIMIT = 1000
DEFAULT_SEPARATOR = ","


class UserCellParserPlugin(
    BasicCellParserPlugin[UserCellValue, UserParsedValue, UserWriteValue]
):

    field_type = [FieldType.User]
    indexable = False

    def parse_base_value(
        self,
        value,
        context,
        field=None,
    ):
        """Parse base cell value"""
        if value is None:
            return None
        return [i.get("id") for i in value if isinstance(i, dict) and i.get("id")]

    def parse_data_value(self, value, context, field):
        """Parse base cell value"""
        if isinstance(value, str):
            return {
                u for u in value.split(DEFAULT_SEPARATOR)[:USER_NUM_IN_CELL_LIMIT] if u
            }
        if isinstance(value, dict):
            return {value.get("text")}
        return None

    def to_write_value(self, value, context, field):
        """Convert to write value"""
        if isinstance(value, set):
            return [HasIdWriteItem(id=i) for i in value]
        return value
