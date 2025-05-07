"""API V1 Blueprint Application"""

from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
from server.schemes import BasicResponseModel
from ._constants import *
from .routers import file, auth, data
from ..exceptions import NormalApiException


api_v1 = FastAPI(
    title="Base Excel Compare and Import Extension API",
    version=API_V1_VERSION,
    description="API for the Base Excel Compare and Import Extension",
    openapi_url="/api/v1/openapi.json",
    license_info={
        "name": "MIT",
        "url": "https://github.com/use-bitable/Excel-Compare-and-Import/blob/main/LICENSE",
    },
    contact={
        "name": "qww",
        "url": "https://github.com/497363983",
        "email": "wqian9790@gmail.com",
    },
)
api_v1.include_router(auth.router)
api_v1.include_router(file.router)
api_v1.include_router(data.router)



@api_v1.exception_handler(NormalApiException)
async def normal_api_exception_handler(request, exc: NormalApiException):
    return ORJSONResponse(
        content=BasicResponseModel(
            code=exc.code,
            message=str(exc),
        ).model_dump()
    )


# from flask import Blueprint
# from flask_restx import Api
# from .append import append_api
# from .file import file_api
# from .auth import auth_api
# from .data import data_api


# api_v1_bp = Blueprint(API_V1_NAME, __name__, url_prefix=API_V1_PREFIX)
# api_rest_v1 = Api(
#     api_v1_bp,
#     version=API_V1_VERSION,
#     title="Base Excel Compare and Import Extension API",
#     description="API for the Base Excel Compare and Import Extension",
#     license="MIT",
#     license_url="https://github.com/use-bitable/Excel-Compare-and-Import/blob/main/LICENSE",
# )
# api_rest_v1.add_namespace(auth_api)
# api_rest_v1.add_namespace(file_api)
# api_rest_v1.add_namespace(append_api)
# api_rest_v1.add_namespace(data_api)
