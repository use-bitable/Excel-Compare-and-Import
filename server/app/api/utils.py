import os
from fastapi.responses import ORJSONResponse
from app.file import read_json_file
from app.schemes import ResponseStatusCode, BasicResponseModel

def get_meta(version: str, namespace: str):
    return read_json_file(
        os.path.join(os.path.dirname(__file__), version, "meta", f"{namespace}.json")
    )


def make_response(
    code: ResponseStatusCode = ResponseStatusCode.SUCCESS,
    data=None,
    msg="success",
):
    res: BasicResponseModel = {
        "code": code,
    }
    if data:
        res["data"] = data
    if msg:
        res["message"] = msg
    return ORJSONResponse(
        content=res,
    )
