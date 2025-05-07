import os
import functools
from typing import Callable

import orjson

from server.file import create_file
from .types import BasicValueType


CACHE_DIR = "preview"


def data_cache[C: dict, F: Callable](
    get_cache_key: Callable[[C], str],
):
    """Decorator for cache preview data"""

    def decorator(
        func: F,
    ):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            """Wrapper for cache preview data"""
            key = get_cache_key(*args, **kwargs)
            # cache_path = os.path.join(f.dir_path, "cache", cache_dir, f"{key}.json")
            if not os.path.exists(key):
                data = func(*args, **kwargs)
                create_file(key, orjson.dumps(data), "wb")
                return data
            with open(key, "rb") as file:
                return orjson.loads(file.read())

        return wrapper

    return decorator


def parse_data_to_dict(data: list[list[BasicValueType]], fields: list[str]):
    """Parse the data"""
    return [dict(zip(fields, row)) for row in data]
