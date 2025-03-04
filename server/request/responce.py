from typing import TypedDict, Optional, Any
from enum import IntEnum


class ResponceStatusCode(IntEnum):
    SUCCESS = 0
    INVALIDATE_PARAMS = 1
    INTERNAL_ERROR = 2

    # file 10xx
    FILE_EXCEEDED_LIMIT = 1001
    INVALIDATE_File = 1002

    # auth 20xx
    UNAUTHORIZED = 2001
    INVALIDATE_TOKEN = 2002
    NOPERSONALBASETOKEN = 2003


class Responce(TypedDict):
  """Reponce class"""
  # success if code == 0, else failure
  code: ResponceStatusCode
  data: Optional[dict[str, Any]]
  msg: Optional[str]

def make_responce(
        code: int,
        data: dict = None,
        msg: str = None
):
    responce: Responce = {
        "code": code
    }
    if data:
        responce["data"] = data
    if msg:
        responce["msg"] = msg
    return responce