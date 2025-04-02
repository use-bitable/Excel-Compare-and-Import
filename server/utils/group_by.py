from typing import Sequence, Callable, DefaultDict
from collections import defaultdict


def group_by[T, R](
    iterable: Sequence[T], key: Callable[[T], R]
) -> DefaultDict[R, list[T]]:
    """Group by key"""
    res: DefaultDict[R, list[T]] = defaultdict(list)
    for item in iterable:
        k = key(item)
        res[k].append(item)
    return res
