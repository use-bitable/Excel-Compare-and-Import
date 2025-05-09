from typing import Literal
from enum import Enum

type BaseProduct = Literal["FEISHU", "LARK"]


class DiffType(Enum):
    ADD = "ADD"
    DELETE = "DELETE"
    UPDATE = "UPDATE"
