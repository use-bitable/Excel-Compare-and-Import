import os
import functools
from json import loads, dumps
from typing import Callable
from server.file import FileItem, create_file
from server.data_parser.types import PaginationConfig
from .types import CanPaginationData


CACHE_DIR = "preview"


def data_cache[C: dict](
    get_cache_key: Callable[[C], str],
):
    """Decorator for cache preview data"""

    def decorator(
        func: Callable[[FileItem, C], CanPaginationData[list[list]]],
    ):
        @functools.wraps(func)
        def wrapper(f: FileItem, config: C):
            """Wrapper for cache preview data"""
            key = get_cache_key(config)
            cache_path = os.path.join(f.dir_path, "cache", CACHE_DIR, f"{key}.json")
            if not os.path.exists(cache_path):
                data = func(f, config)
                create_file(cache_path, dumps(data), "w")
                return data
            with open(cache_path, "r") as file:
                return loads(file.read())

        return wrapper

    return decorator
