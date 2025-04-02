from typing import TypedDict, Optional, NotRequired, Literal
from ..types import HeadersMapping


class BoolValueConfig(TypedDict):
    """Bool value config type."""

    true: list[str]
    false: list[str]


RequestMethod = Literal["GET", "POST"]


class RequestConfig(TypedDict):
    """Request config type."""

    method: RequestMethod
    headers: NotRequired[Optional[HeadersMapping]]
    body: NotRequired[Optional[str]]


class LocationConfig(TypedDict):
    """Location config type."""

    type: str


class LinkConfig(TypedDict):
    """Link config type."""

    primary_key: str
    allow_add: bool
    view_id: Optional[str]


class FieldConfig(TypedDict):
    """Field config type."""

    format: NotRequired[Optional[str | list[str]]]
    separator: NotRequired[Optional[str]]
    boolValue: NotRequired[Optional[BoolValueConfig]]
    requestConfig: NotRequired[Optional[RequestConfig]]
    locationConfig: NotRequired[Optional[LocationConfig]]
