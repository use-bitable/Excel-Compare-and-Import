from typing import TypedDict, Optional, Any
from server.schemes import ResponseStatusCode

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
