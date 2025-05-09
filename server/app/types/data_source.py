"""Data Source type"""

from typing import Any, TypedDict, Literal, NotRequired
import json

type_enum = ["file", "url"]


def data_source(value: Any):
    """Data source field name"""
    if not isinstance(value, str):
        raise ValueError("Source must be a string")
    parsed = json.loads(value)
    if not isinstance(parsed, dict):
        raise ValueError("Parsed data source must be a dictionary")
    if "type" not in parsed:
        raise ValueError("Source must have a type")
    if parsed["type"] not in type_enum:
        raise ValueError(f"Source type must be one of {type_enum}")
    return parsed


data_source.__schema__ = {"type": "string", "format": "{type: string}"}


class DataSourceType(TypedDict):
    """Data Source type"""

    type: Literal["file", "url"]
    file: Any
    url: Any
    config: Any
    fieldsMap: Any
