from typing import TypedDict, Optional
from ..types import DataRange


class ReadXLSConfig(TypedDict):
    """XLS data parser config."""

    sheet_name: Optional[str]
    """Sheet name"""

    data_range: Optional[str | DataRange]
    """Data range

    Default: None
    
    Example: A1:B2, 1:20, A:C or the dict like {"min_row": 1, "max_row": 20, "min_col": 1, "max_col": 3}
    
    """

    header: Optional[int]
    """Header row index, start from 1

    Default: 1
    """

    # performance_mode: Optional[bool]
    # """Performance mode

    # Default: False
    # """
