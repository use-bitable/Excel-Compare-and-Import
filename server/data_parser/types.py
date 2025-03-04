from typing import TypedDict, Optional



class PagnationConfig(TypedDict):
    """Pagnation config"""
    page_token: Optional[int]
    """Page number, start from 0."""
    page_size: int
    """Per page number"""

class PreviewConfig[C: dict](PagnationConfig):
    """Preview config"""
    config: C
    """Config"""

class PagnationData[D](PreviewConfig):
    """Pagnation data"""
    data: D
    """Page Data"""

type CanPagnationData[D] = PagnationData[D] | D
type BasicValueType = str | int | float | bool | None