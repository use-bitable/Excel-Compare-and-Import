from typing import TypedDict, Optional, Required


class ReadXLSXConfig(TypedDict):
    """XLSX data parser config."""

    sheet_name: Required[str]
    """Sheet name"""

    data_range: Optional[str]
    """Data range

    Default: None
    
    Example: A1:B2, 1:20, A:C, etc.
    """

    header: Optional[int]
    """Header row index, start from 1

    Default: 1
    """

    performance_mode: Optional[bool]
    """Performance mode

    Default: False
    """
