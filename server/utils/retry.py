from typing import Callable


def retry[**T, R](
    func: Callable[T, R],
    max_retries: int = 3,
    on_error: Callable[[Exception], None] | None = None,
) -> Callable[T, R]:
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
            except Exception as e:
                retries += 1
                if retries == max_retries:
                    if on_error:
                        on_error(e)
                    raise e

    return wrapper
