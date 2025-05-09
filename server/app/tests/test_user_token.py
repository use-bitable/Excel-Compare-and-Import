from app.user import serialize_security_key, get_user_token_manager, UserTokenMeta


def test_user_token():
    personal_base_token = (
        "pt-ApsdmDzoKc9vpu66XbUwchLdLklfpwsXY-3c1GSVAQAAHICBXgIAQONoEbZF"
    )
    assert (
        serialize_security_key(personal_base_token)
        == "ApsdmDzoKc9vpu66XbUwchLdLklfpwsX"
    )
    userTokenManager = get_user_token_manager(personal_base_token)
    userTokenMeta = UserTokenMeta(
        tenant_key="tenant_key", base_id="base_id", user_id="user_id", product="FEISHU"
    )
    token = userTokenManager.encode_token(userTokenMeta)
    decode_meta = userTokenManager.decode_token(token)
    assert decode_meta == userTokenMeta
