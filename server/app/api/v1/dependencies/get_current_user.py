from typing import Annotated
from fastapi import Header, Depends
from fastapi.security import OAuth2PasswordBearer
from server.schemes import User
from server.user import get_user_token_manager
from ..exceptions import ApiAuthenticationFailedException


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    personal_base_token: Annotated[str, Header(alias="PersonalBaseToken")],
):
    """Get current user from token."""
    user_token_manager = get_user_token_manager(personal_base_token)
    try:
        user_token_meta = user_token_manager.decode_token(token)
        return User(
            user_id=user_token_meta.user_id,
            tenant_key=user_token_meta.tenant_key,
            base_id=user_token_meta.base_id,
            product=user_token_meta.product,
        )
    except Exception as e:
        raise ApiAuthenticationFailedException(f"Authentication error[token: {token}]: {e}") from e