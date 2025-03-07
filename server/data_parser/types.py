from typing import TypedDict, Optional, Literal


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
    type: Literal["url"]

class FileValue(TypedDict):
    """File value"""
    name: str
    """File name"""
    type: Literal["file"]
    size: int
    """File size"""
    md5: str
    """MD5 hash"""
    token: Optional[str]
    """Token"""


type CanPaginationData[D] = PaginationData[D] | D
type BasicValueType = str | int | float | bool | None | UrlValue | list[FileValue]
