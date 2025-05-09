from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from server.base import IBase
from server.api.utils import make_response
from server.user import get_user_token_manager, UserTokenMeta
from server.schemes import (
    BasicResponseModel,
    UserTokenResponseDataModel,
)
from .._constants import API_V1_LIST
from ..exceptions import ApiAuthenticationFailedException

AUTH_API_NAMESPACE = "auth"
AUTH_API_META = API_V1_LIST[AUTH_API_NAMESPACE]
AUTH_API_RESOURCES = AUTH_API_META["resource"]

router = APIRouter(
    prefix=AUTH_API_META["prefix"],
    tags=AUTH_API_META["tags"],
)


def parse_username(username: str) -> tuple[str, str, str, str]:
    """Parse username into product, tenant_key, base_id and user_id."""
    try:
        product, tenant_key, base_id, user_id = username.split("/")
    except ValueError:
        # raise ApiAuthenticationFailedException("Invalid username format")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid username format: expect `product/tenant_key/base_id/user_id`, got `{username}`",
        )
    return product, tenant_key, base_id, user_id


@router.post(
    AUTH_API_RESOURCES["token"]["path"],
    status_code=status.HTTP_200_OK,
    response_model=UserTokenResponseDataModel,
)
async def get_user_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """Get user token.

    - **username**: The username in the format of `product/tenant_key/base_id/user_id`.
    - **password**: The personal base token.

    """
    product, tenant_key, base_id, user_id = parse_username(form_data.username)
    password = form_data.password
    try:
        IBase(
            base_id=base_id,
            personal_base_token=password,
            product=product,
            tenant_key=tenant_key,
            user_id=user_id,
        )
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"{e}")
    user_token_manager = get_user_token_manager(password)
    try:
        user_token = user_token_manager.encode_token(
            UserTokenMeta(
                tenant_key=tenant_key,
                base_id=base_id,
                user_id=user_id,
                product=product,
            )
        )
        return UserTokenResponseDataModel(access_token=user_token).model_dump()
    except Exception as e:
        # raise ApiAuthenticationFailedException(str(e)) from e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal error when get user token.",
        )


# token_parser = auth_api.parser()
# add_args(token_parser, user_token_model)


# @auth_api.route(AUTH_API_RESOURCES["token"]["path"])
# @auth_api.doc(AUTH_API_RESOURCES["token"]["description"])
# class UserTokenAPI(Resource):
#     """User token API class."""

#     @auth_api.expect(token_parser, validate=True)
#     def post(self):
#         """Get user token."""
#         args = token_parser.parse_args(strict=True)
#         user_token_security_key: str | None = args.get("PersonalBaseToken", None)
#         if not user_token_security_key:
#             return (
#                 make_response(
#                     code=ResponseStatusCode.NO_PERSONAL_BASE_TOKEN,
#                     msg="No personal base token provided",
#                 ),
#                 200,
#             )
#         user_id = args.get("user_id")
#         tenant_key = args.get("tenant_key")
#         base_id = args.get("base_id")
#         product = args.get("product")
#         try:
#             IBase(base_id, user_token_security_key, product)
#         except Exception as e:
#             g.logger.error(f"Error when create base: {e}")
#             return (
#                 make_response(
#                     code=ResponseStatusCode.INVALIDATE_PARAMS,
#                     msg="Invalidate personal base token",
#                 ),
#                 200,
#             )
#         try:
#             user_token_meta = UserTokenMeta(
#                 tenant_key=tenant_key, base_id=base_id, user_id=user_id, product=product
#             )
#         except Exception as e:
#             g.logger.error(f"Error when create user token meta: {e}")
#             return (
#                 make_response(
#                     code=ResponseStatusCode.INVALIDATE_PARAMS,
#                     msg="Invalidate parameters",
#                 ),
#                 200,
#             )
#         try:
#             userTokenManager = get_user_token_manager(user_token_security_key)
#         except Exception as e:
#             g.logger.error(f"Error when get user token manager: {e}")
#             return (
#                 make_response(
#                     code=ResponseStatusCode.INVALIDATE_PARAMS,
#                     msg="Invalidate parameters",
#                 ),
#                 200,
#             )
#         try:
#             user_token = userTokenManager.encode_token(user_token_meta)
#         except Exception as e:
#             g.logger.error(f"Error when encode user token: {e}")
#             return (
#                 make_response(
#                     code=ResponseStatusCode.INTERNAL_ERROR,
#                     msg="Internal Error when get user token.",
#                 ),
#                 200,
#             )
#         return (
#             make_response(
#                 code=ResponseStatusCode.SUCCESS,
#                 data={"token": user_token},
#                 msg="success",
#             ),
#             200,
#         )
