from typing import TypedDict, Optional, Literal, Required, Any
from datetime import datetime


class PaginationConfig[C: dict](TypedDict):
    """Pagination config"""

    page_token: Optional[int]
    """Page number, start from 0."""
    page_size: Optional[int]
    """Per page number"""
    config: Optional[C]
    """Config"""


class PaginationData[D](TypedDict):
    """Pagination data"""

    data: D
    """Page Data"""
    page_token: Optional[int]
    """Page number, start from 0."""
    page_size: Required[int]
    """Per page number"""
    has_more: Required[bool]
    """Has more data"""


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
    parent_token: str
    """Parent token"""


type CanPaginationData[D] = PaginationData[D] | D
type BasicValueType = str | int | float | bool | None | UrlValue | list[FileValue] | datetime


class DataMeta(TypedDict):
    """Data meta"""

    fields: list[str]
    """Fields"""
    total: int
    """Total count""" 
    can_parse: bool
    """Can parse"""
    errors: list[str]
    """Errors"""
    extra: dict[str, Any]
    """Extra"""


class ParsedData(TypedDict):
    """Parsed data"""

    data: list[dict[str, BasicValueType]]
    """Parsed data"""
    meta: DataMeta
    """Meta"""


class DataRange(TypedDict):
    """Data range"""

    min_row: Required[int]
    """Min row"""
    max_row: Required[int]
    """Max row"""
    min_col: Required[int]
    """Min column"""
    max_col: Required[int]
    """Max column"""