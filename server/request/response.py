from typing import TypedDict, Optional, Any
from enum import IntEnum


class ResponseStatusCode(IntEnum):
    SUCCESS = 0
    INVALIDATE_PARAMS = 1
    INTERNAL_ERROR = 2

    # file 10xx
    FILE_EXCEEDED_LIMIT = 1001
    INVALIDATE_File = 1002

    # auth 20xx
    UNAUTHORIZED = 2001
    INVALIDATE_TOKEN = 2002
    NO_PERSONAL_BASE_TOKEN = 2003


class Response(TypedDict):
    """Response class"""

    # success if code == 0, else failure
    code: ResponseStatusCode
    data: Optional[dict[str, Any]]
    msg: Optional[str]


def make_response(code: int, data: dict = None, msg: str = None):
    response: Response = {"code": code}
    if data:
        response["data"] = data
    if msg:
        response["msg"] = msg
    return response
