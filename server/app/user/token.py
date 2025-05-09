from app.token import TokenMeta, tokenclass, TokenManager


@tokenclass
class UserTokenMeta(TokenMeta):
    """User Token Meta"""

    tenant_key: str
    base_id: str
    user_id: str
    product: str


def serialize_security_key(key: str) -> str:
    """Serialize security key

    Args:
        key (str): Security key

    Returns:
        str: Serialized security key
    """
    if len(key) < 32:
        return key + "0" * (32 - len(key))
    if len(key) < 35:
        return key[:32]
    return key[3:35]


def get_user_token_manager(security_key: str):
    return TokenManager(UserTokenMeta, serialize_security_key(security_key))
