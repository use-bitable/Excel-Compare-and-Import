from flask import request, Flask, g
from server.request import ResponseStatusCode, make_responce
from server.user import get_user_token_manager
from server.api import (
    API_NEED_AUTH_PATH,
    AUTHORIZATION_HEADER_KEY,
    USER_TOKEN_SECURITY_KEY,
)
from server.log import logger


def need_authentication(path: str):
    """Check if the path need authentication."""
    return path in API_NEED_AUTH_PATH


def AuthenticationMiddleware(app: Flask):
    """Authentication Middleware for the Flask application."""

    @app.before_request
    def authenticate_request():
        """Authenticate the request."""
        if need_authentication(request.path):
            g.needs_authentication = True
            user_token = request.headers.get(AUTHORIZATION_HEADER_KEY)
            if not user_token:
                return (
                    make_responce(
                        ResponseStatusCode.UNAUTHORIZED, msg="No user token provided"
                    ),
                    200,
                )
            user_token_security_key = request.headers.get(USER_TOKEN_SECURITY_KEY)
            if not user_token_security_key:
                return (
                    make_responce(
                        ResponseStatusCode.UNAUTHORIZED,
                        msg="No personal base token provided",
                    ),
                    200,
                )
            userTokenManager = get_user_token_manager(user_token_security_key)
            try:
                user_token_meta = userTokenManager.decode_token(user_token)
                g.user_meta = user_token_meta
                g.is_authenticated = True
            except Exception as e:
                global logger
                logger = logger.bind(
                    request_path=request.path,
                    request_method=request.method,
                    user_token=user_token,
                    user_token_security_key=user_token_security_key,
                )
                logger.error(f"Invalid user token or personalBaseToken: {e}")
                return (
                    make_responce(
                        ResponseStatusCode.INVALIDATE_TOKEN,
                        msg=f"Invalid user token or personalBaseToken: {e}",
                    ),
                    200,
                )
        else:
            g.needs_authentication = False

    return app
