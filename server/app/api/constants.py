from .v1 import API_V1_PATH_LIST, API_V1_NEED_AUTH_PATH_LIST

API_PATH_LIST = set([*API_V1_PATH_LIST])
API_NEED_AUTH_PATH = set([*API_V1_NEED_AUTH_PATH_LIST])
AUTHORIZATION_HEADER_KEY = "Authorization"
USER_TOKEN_SECURITY_KEY = "PersonalBaseToken"
DEFAULT_SUCCESS_MSG = "success"
