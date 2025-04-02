from typing import Callable, TypedDict
from .retry import retry

type QueryToken = str | int | None
type QueryReturn[T] = tuple[QueryToken, list[T], bool, int]
"""The type of query return (Page token, items, has_more, total)."""
type QueryFunc[T] = Callable[[QueryToken], QueryReturn[T]]
"""The type of query function.

Args:
    str | int | None: Page token
Returns:
    tuple[str | int | None, list[T], bool, int]: Page token, items, has_more, total
"""


class OnPageArgs(TypedDict):
    page_token: QueryToken
    has_more: bool
    loaded: int
    total: int


def paginate[T](
    query: QueryFunc[T],
    max_retries: int = 3,
    on_page: Callable[[OnPageArgs], None] = None,
    on_error: Callable[[Exception], None] = None,
) -> list[T]:
    """Paginate a query.

    Args:
        query (Callable[[str  |  None], tuple[str  |  None, list[T]]]): Method to query data
        max_retries (int, optional): Max retry time. Defaults to 3.
        on_page (Callable[[tuple[str | int | None, bool, int, int]], None], optional): Callback function when a page is fetched. Defaults to None.

    Returns:
        list[T]: List of data
    """
    res = []
    page_token = None
    has_more = True
    get_data = retry(query, max_retries, on_error)
    while has_more:
        page_token, items, has_more, total = get_data(page_token)
        if on_page:
            on_page(
                {
                    "page_token": page_token,
                    "has_more": has_more,
                    "loaded": len(res),
                    "total": total,
                }
            )
        res.extend(items)
    return res


def paginate_iterator[T](
    query: QueryFunc[T],
    max_retries: int = 3,
):
    page_token = None
    has_more = True
    get_data = retry(query, max_retries)
    while has_more:
        page_token, items, has_more, total = get_data(page_token)
        yield items
