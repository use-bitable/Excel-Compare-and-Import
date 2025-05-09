from __future__ import annotations
import app.base
from abc import abstractmethod
from app.data_parser.types import BasicValueType
from app.cell_value.types import BaseCellValue

class ICell[V]:
    """Interface for cell"""

    __slots__ = ["_raw_value", "parsed_value", "field"]

    _raw_value: V

    def __init__(self, value: V, field: app.base.field.IBaseField) -> None:
        self.raw_value = value
        self.field = field

    @property
    def raw_value(self) -> V:
        return self._raw_value

    @raw_value.setter
    def raw_value(self, value: V):
        self._raw_value = value
        self.parsed_value = self.parse_value(value)

    @abstractmethod
    def parse_value(self, value: V):
        pass

    def __eq__(self, obj: object) -> bool:
        if not isinstance(obj, ICell):
            return self.parse_value == obj
        return self.parsed_value == obj.parsed_value


class IBaseCell(ICell[BaseCellValue]):
    """Base cell class"""

    def __init__(
        self,
        value: BaseCellValue,
        field: app.base.field.IBaseField,
    ) -> None:
        super().__init__(value, field)

    def parse_value(self, value: BaseCellValue):
        field = self.field
        return app.cell_value.CELL_PARSER.parse_base_value(field.type, field, value)


class IDataCell(ICell[BasicValueType]):
    """Data cell class"""

    def __init__(
        self,
        value: BasicValueType,
        field: app.base.field.IBaseField,
    ) -> None:
        super().__init__(value, field)

    def parse_value(self, value):
        return app.cell_value.CELL_PARSER.parse_data_value(
            self.field,
            value,
        )


class IDiffCell(ICell):

    def __init__(
        self,
        value: BasicValueType,
        field: app.base.field.IBaseField,
    ) -> None:
        super().__init__(value, field)
