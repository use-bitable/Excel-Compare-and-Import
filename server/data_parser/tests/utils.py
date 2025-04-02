from typing import TypedDict, Callable
from server.data_parser.types import PaginationConfig


class TestCase[C: dict, D](TypedDict):
    description: str
    config: PaginationConfig[C]
    judge: list[tuple[Callable[[D], bool], str]]
