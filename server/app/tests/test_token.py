from server.token import TokenMeta, TokenManager, decrypt_token, tokenclass
from orjson import dumps, OPT_SORT_KEYS
from server.tests.utils import DEFAULT_SECURITY_KEY


@tokenclass
class UserTokenMeta(TokenMeta):
    base_id: str
    user_id: str
    tenant_key: str
    type: str = "user"


userTokenManager = TokenManager(UserTokenMeta, DEFAULT_SECURITY_KEY)

test_dict = {
    "base_id": "base_id",
    "user_id": "user_id",
    "tenant_key": "tenant_key",
    "type": "user",
}

test_dict2 = {
    "base_id": "base_id2",
    "user_id": "user_id",
    "tenant_key": "tenant_key2",
    "type": "user",
}


def test_token():
    meta = UserTokenMeta(**test_dict)
    meta2 = UserTokenMeta(**test_dict2)
    token = userTokenManager.encode_token(meta)
    decrypted = decrypt_token(token, DEFAULT_SECURITY_KEY)
    test_str = dumps(UserTokenMeta(**test_dict), option=OPT_SORT_KEYS).decode()
    wrong_token = userTokenManager.encode_token(meta2)
    assert decrypted == test_str
    assert token != wrong_token
