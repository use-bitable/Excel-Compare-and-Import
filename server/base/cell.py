from __future__ import annotations
import server.base
import server.cell_value
from server.types import FieldType, FieldUIType, RawValueType
from server.data_parser.types import BasicValueType
from .const import AUTO_FIELD_TYPES


class ICell(object):
    """Interface for cell"""

    __slots__ = ["raw_value", "auto", "type", "ui_type", "parsed_value", "field_id"]

    raw_value: BasicValueType | server.cell_value.BaseCellValue
    auto: bool

    def __init__(
        self,
        value: RawValueType | server.cell_value.BaseCellValue,
        field_id: str,
        type: FieldType,
        ui_type: FieldUIType,
        parsed_value=None,
    ) -> None:
        self.raw_value = value
        self.type = type
        self.ui_type = ui_type
        self.auto = type in AUTO_FIELD_TYPES
        self.parsed_value = parsed_value
        self.field_id = field_id

    @staticmethod
    def create_cell(
        value: RawValueType, field: server.base.field.IBaseField, parsed_value=None
    ) -> ICell:
        """Create cell"""
        return ICell(
            value, field.id, field.type, field.ui_type, parsed_value=parsed_value
        )

    def __eq__(self, obj: object) -> bool:
        if not isinstance(obj, ICell):
            return self.raw_value == obj
        return self.raw_value == obj.raw_value


class IDiffCell(ICell):

    def __init__(
        self,
        value: RawValueType,
        field: server.base.field.IBaseField,
        parsed_value=None,
    ) -> None:
        super().__init__(
            value, field.id, field.type, field.ui_type, parsed_value=parsed_value
        )
