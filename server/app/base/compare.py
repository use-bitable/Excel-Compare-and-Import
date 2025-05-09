from enum import Enum


class CompareMode(Enum):
    """Compare mode enum."""

    APPEND = "append"
    MERGE_DIRECT = "merge_direct"
    MERGE_COMPARE = "compare_merge"
