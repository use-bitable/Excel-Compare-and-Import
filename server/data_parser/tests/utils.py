from typing import TypedDict, Callable
from server.data_parser.types import PreviewConfig, PagnationData

class TestCase[C: dict, D](TypedDict):
    config: PreviewConfig[C]
    judge: list[tuple[Callable[[D], bool], str]]