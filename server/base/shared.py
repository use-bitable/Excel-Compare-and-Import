"""Shared utility functions"""

from typing import Sequence, Callable


def retry[**T, R](func: Callable[T, R], max_retries: int = 3) -> Callable[T, R]:
    """Retry a function when it fails.

    Args:
        func (Callable[[T],R]): Function to retry
        max_retries (int, optional): Max retry time. Defaults to 3.

    Returns:
        Callable[[T],R]: Wrapper function
    """

    def wrapper(*args: T.args, **kwargs: T.kwargs) -> R:
        retries = 0
        while retries < max_retries:
            try:
                return func(*args, **kwargs)
            # pylint: disable=broad-except
            except Exception as e:
                retries += 1
                if retries == max_retries:
                    raise e

    return wrapper


def paginate[T](
    query: Callable[[str | None], tuple[str | None, list[T]]], max_retries: int = 3
) -> list[T]:
    """Paginate a query.

    Args:
        query (Callable[[str  |  None], tuple[str  |  None, list[T]]]): Method to query data

    Returns:
        list[T]: List of data
    """
    res = []
    page_token = None
    has_more = True
    get_data = retry(query, max_retries)
    while has_more:
        (page_token, items) = get_data(page_token)
        res.extend(items)
        has_more = bool(page_token)
    return res


def unique[T](li: list[T]):
    """Unique list

    Args:
        li (list): Origin list to unique

    Returns:
        list: Unique list
    """
    return list(set(li))


def list_has_same_el(l1: list, l2: list):
    """Judge if two lists have same elements"""
    return set(l1) == set(l2)


def singleton[T](cls: T):
    """Singleton decorator"""
    instances = {}

    def wrapper(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return wrapper


def iter_run[**K, R](
    seq: Sequence[Callable[K, R]], *args: K.args, **kwargs: K.kwargs
) -> list[R]:
    """Iterate and run functions"""
    res: list[R] = []
    for func in seq:
        res.append(func(*args, **kwargs))
    return res


def batch[T](iterable: Sequence[T], batch_size: int):
    """Batch iterable"""
    for i in range(0, len(iterable), batch_size):
        yield iterable[i : i + batch_size]


def batch_action[T, R](
    iterable: Sequence[T], action: Callable[[Sequence[T]], list[R]], batch_size: int
):
    """Batch action"""
    batched = batch(iterable, batch_size)
    results: list[R] = []
    for chunk in batched:
        results.extend(action(chunk))
    return results


def group_by[T, R](iterable: Sequence[T], key: Callable[[T], R]) -> dict[R, list[T]]:
    """Group by key"""
    res = {}
    for item in iterable:
        k = key(item)
        if k not in res:
            res[k] = []
        res[k].append(item)
    return res
