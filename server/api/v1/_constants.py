from ..types import APIMeta
from ..utils import get_meta

API_V1_LIST: dict[str, APIMeta] = {
    "file": get_meta("v1", "file"),
    "auth": get_meta("v1", "auth"),
}

API_V1_PREFIX = "/api/v1"
API_V1_NAME = "api_v1"
API_V1_VERSION = "1.0.0"
API_V1_PATH_LIST = set([
    API_V1_PREFIX + "/" + meta.get("namespace") + resource.get("path") for meta in API_V1_LIST.values() for resource in meta.get("resource").values()
])
API_V1_NEED_AUTH_PATH_LIST = set([
    API_V1_PREFIX + "/" + meta.get("namespace") + resource.get("path") for meta in API_V1_LIST.values() for resource in meta.get("resource").values() if resource.get("need_auth")
])

