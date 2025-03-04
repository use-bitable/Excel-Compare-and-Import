import os
from server.file import read_json_file

def get_meta(version: str, namespace: str):
    return read_json_file(
        os.path.join(
            os.path.dirname(__file__), 
            version,
            "meta", 
            f"{namespace}.json"
        )
    )

def pagenate(
        cls,
        *,
        page_size: int,
        page_token: int | None,
):
    """Pagenate decorator"""
    def wrapper(func):
        def wrapped(*args, **kwargs):
            data = func(*args, **kwargs)
            if page_token is not None:
                data = data[page_token: page_token + page_size]
            return data
        return wrapped
    return wrapper