from typing import Optional, Set
from server.types import FieldType
from .core import BasicCellParserPlugin
from .types import MultiSelectCellValue

OPTIONS_IN_CELL_LIMIT = 1000
DEFAULT_SEPARATOR = ","


def parse_multiselect_str(
    value: str, separator: str = DEFAULT_SEPARATOR
) -> Optional[Set[str]]:
    return set(value.split(separator).sort())[:OPTIONS_IN_CELL_LIMIT]


class MultiSelectCellParserPlugin(
    BasicCellParserPlugin[MultiSelectCellValue, Set[str]]
):
    """Multi select cell value translator"""

    field_type = [FieldType.MultiSelect]

    def parse_base_value(
        self,
        value,
        context,
        field=None,
    ):
        """Parse base cell value"""
        if isinstance(value, list):
            return set(value.sort())
        return None

    def parse_data_value(self, value, context, field):
        """Parse base cell value"""
        if isinstance(value, (str, dict)):
            separator = (
                (field.config.get("separator") or DEFAULT_SEPARATOR)
                if field.config
                else DEFAULT_SEPARATOR
            )
            return parse_multiselect_str(
                value if isinstance(value, str) else value.get("text"), separator
            )
        if isinstance(value, (int, float, bool)):
            return {str(value)}
        return None
