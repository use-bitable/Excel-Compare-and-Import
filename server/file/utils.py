import os
import hashlib
import httpx
import re
from typing import IO
import orjson
from .exceptions import (
    CreateDirException,
    CreateFileException,
    CaculateMD5Exception,
    InValidUrlException,
    GetFileFromUrlException,
)


def create_file(
    filename: str, data: IO, mode: str = "wb+", encoding: str | None = None
):
    """Create file

    Args:
        filename (str): file path
        data (IO): file data
        mode (str, optional): open file mode. Defaults to "wb+".
        encoding (str | None, optional): file encoding. Defaults to None.
    """
    dirname = os.path.dirname(filename)
    need_mkdir = not os.path.exists(dirname)
    if need_mkdir:
        try:
            os.makedirs(dirname, exist_ok=True)
        except Exception as e:
            raise CreateDirException(f"Create {dirname} error: {e}")
    try:
        with open(filename, mode, encoding=encoding) as f:
            f.write(data)
    except Exception as e:
        raise CreateFileException(f"Create file {filename} error: {e}")


async def async_create_file(
    filename: str, data: IO, mode: str = "wb+", encoding: str | None = None
):
    """Create file

    Args:
        filename (str): file path
        data (IO): file data
        mode (str, optional): open file mode. Defaults to "wb+".
        encoding (str | None, optional): file encoding. Defaults to None.
    """
    create_file(filename, data, mode, encoding)


def get_file_md5(filename: str | IO):
    """Caculate File MD5

    Args:
        filename (str | IO): file path

    Returns:
        str: MD5
    """
    h = hashlib.md5()
    need_close = False
    try:
        if isinstance(filename, str):
            f = open(filename, "rb")
            need_close = True
        else:
            f = filename
        while chunk := f.read(128 * h.block_size):
            h.update(chunk)
    except Exception as e:
        raise CaculateMD5Exception(f"Caculate {filename} MD5 error: {e}")
    finally:
        if need_close:
            f.close()
    return h.digest().hex()


def get_md5_from_bytes(data: bytes):
    h = hashlib.md5()
    h.update(data)
    return h.hexdigest()


def read_file(file: str, mode: str = "rb+"):
    with open(file, mode=mode) as f:
        return f.read()


def read_json_file(file: str, mode: str = "rb"):
    return orjson.loads(read_file(file, mode=mode))


def get_file_from_url(
    url: str, timeout: int = 10, headers: httpx._models.HeaderTypes = None
) -> bytes:
    """Get file from http/https/ftp url"""

    # validate url
    url_protocol_pattern = r"^(http|https|ftp)://"
    if not re.match(url_protocol_pattern, url):
        raise InValidUrlException(f"Invalid url: {url}, must start with http/https/ftp")
    try:
        r = httpx.get(url, timeout=timeout, headers=headers)
        if r.status_code != 200:
            raise GetFileFromUrlException(f"Get file from {url} error: {r.text}")
        return r.content
    except Exception as e:
        raise GetFileFromUrlException(f"Get file from {url} error: {e}")
