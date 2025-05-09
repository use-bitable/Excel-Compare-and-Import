from server.api.types import APIMeta
from server.api.utils import get_meta

API_V1_LIST: dict[str, APIMeta] = {
    "file": get_meta("v1", "file"),
    "auth": get_meta("v1", "auth"),
    "data": get_meta("v1", "data"),
}
 
API_V1_PREFIX = "/api/v1"
API_V1_NAME = "api_v1"
API_V1_VERSION = "1.0.0"
API_V1_PATH_LIST = set(
    [
        API_V1_PREFIX + "/" + meta["namespace"] + resource["path"]
        for meta in API_V1_LIST.values()
        for resource in meta["resource"].values()
    ]
)
API_V1_NEED_AUTH_PATH_LIST = set(
    [
        API_V1_PREFIX + "/" + meta["namespace"] + resource["path"]
        for meta in API_V1_LIST.values()
        for resource in meta["resource"].values()
        if resource["need_auth"]
    ]
)
