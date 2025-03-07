from typing import TypedDict, Optional


class PaginationConfig(TypedDict):
    """Pagination config"""

    page_token: Optional[int]
    """Page number, start from 0."""
    page_size: int
    """Per page number"""


class PreviewConfig[C: dict](PaginationConfig):
    """Preview config"""

    config: C
    """Config"""


class PaginationData[D](PreviewConfig):
    """Pagination data"""

    data: D
    """Page Data"""

class UrlValue(TypedDict):
    """URL value"""
    url: str
    """URL"""
    text: str
    """Text"""


type CanPaginationData[D] = PaginationData[D] | D
type BasicValueType = str | int | float | bool | None | UrlValue
