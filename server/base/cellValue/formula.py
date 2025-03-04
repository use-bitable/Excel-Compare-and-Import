from .core import TranslatorOption, FieldRole
from ..field import IField
from ..field_type import FieldType
from ...types import RawValueType


def formula_normalize(value: RawValueType, _: IField, __: str):
    return str(value)


FORMULA_TRANSLATOR = TranslatorOption(
    field_type=FieldType.Formula,
    roles=[
        FieldRole.NORMAL,
        FieldRole.AUTO,
        FieldRole.INDEXABLE
    ],
    normalize=formula_normalize,
)