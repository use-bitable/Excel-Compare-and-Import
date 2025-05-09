from enum import Enum
from typing import TypedDict, Required, Literal


class FilterConditionOperator(Enum):
    IS = "is"
    IS_NOT = "isNot"
    CONTAINS = "contains"
    DOES_NOT_CONTAIN = "doesNotContain"
    IS_EMPTY = "isEmpty"
    IS_NOT_EMPTY = "isNotEmpty"
    IS_GREATER = "isGreater"
    IS_GREATER_EQUAL = "isGreaterEqual"
    IS_LESS = "isLess"
    IS_LESS_EQUAL = "isLessEqual"
    LIKE = "like"
    """LIKE Operator, not supported now"""
    IN = "in"
    """IN Operator, not supported now"""


class AppTableRecordFilterCondition(TypedDict):
    field_name: Required[str]
    operator: Required[FilterConditionOperator]
    value: list[str]


class AppTableRecordFilterInfo(TypedDict):
    conjunction: Literal["and", "or"]
    conditions: list[AppTableRecordFilterCondition]
