from flask import g
from flask_restx import Resource, Namespace
from server.base import IBase
from server.request import make_response, ResponseStatusCode
from server.user import get_user_token_manager, UserTokenMeta
from server.models import user_token_model
from server.utils import add_args
from ._constants import API_V1_LIST

AUTH_API_NAMESPACE = "auth"
AUTH_API_META = API_V1_LIST[AUTH_API_NAMESPACE]
auth_api = Namespace(AUTH_API_NAMESPACE, description=AUTH_API_META["description"])
AUTH_API_RESOURCES = AUTH_API_META["resource"]

token_parser = auth_api.parser()
add_args(token_parser, user_token_model)


@auth_api.route(AUTH_API_RESOURCES["token"]["path"])
@auth_api.doc(AUTH_API_RESOURCES["token"]["description"])
class UserTokenAPI(Resource):
    """User token API class."""

    @auth_api.expect(token_parser, validate=True)
    def post(self):
        """Get user token."""
        args = token_parser.parse_args(strict=True)
        user_token_security_key: str | None = args.get("PersonalBaseToken", None)
        if not user_token_security_key:
            return (
                make_response(
                    code=ResponseStatusCode.NO_PERSONAL_BASE_TOKEN,
                    msg="No personal base token provided",
                ),
                200,
            )
        user_id = args.get("user_id")
        tenant_key = args.get("tenant_key")
        base_id = args.get("base_id")
        product = args.get("product")
        try:
            IBase(base_id, user_token_security_key, product)
        except Exception as e:
            g.logger.error(f"Error when create base: {e}")
            return (
                make_response(
                    code=ResponseStatusCode.INVALIDATE_PARAMS,
                    msg="Invalidate personal base token",
                ),
                200,
            )
        try:
            user_token_meta = UserTokenMeta(
                tenant_key=tenant_key, base_id=base_id, user_id=user_id, product=product
            )
        except Exception as e:
            g.logger.error(f"Error when create user token meta: {e}")
            return (
                make_response(
                    code=ResponseStatusCode.INVALIDATE_PARAMS,
                    msg="Invalidate parameters",
                ),
                200,
            )
        try:
            userTokenManager = get_user_token_manager(user_token_security_key)
        except Exception as e:
            g.logger.error(f"Error when get user token manager: {e}")
            return (
                make_response(
                    code=ResponseStatusCode.INVALIDATE_PARAMS,
                    msg="Invalidate parameters",
                ),
                200,
            )
        try:
            user_token = userTokenManager.encode_token(user_token_meta)
        except Exception as e:
            g.logger.error(f"Error when encode user token: {e}")
            return (
                make_response(
                    code=ResponseStatusCode.INTERNAL_ERROR,
                    msg="Internal Error when get user token.",
                ),
                200,
            )
        return (
            make_response(
                code=ResponseStatusCode.SUCCESS,
                data={"token": user_token},
                msg="success",
            ),
            200,
        )
