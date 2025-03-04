""" API V1 Blueprint Application """

from flask import Blueprint
from flask_restx import Api
from .append import append_api
from .file import file_api
from .auth import auth_api
from ._constants import *

api_v1_bp = Blueprint(API_V1_NAME, __name__, url_prefix=API_V1_PREFIX)
api_rest_v1 = Api(
    api_v1_bp,
    version=API_V1_VERSION,
    title='Base Excel Compare and Import Extension API',
    description='API for the Base Excel Compare and Import Extension',
    license='MIT',
    license_url="https://github.com/use-bitable/Excel-Compare-and-Import/blob/main/LICENSE"
)
api_rest_v1.add_namespace(auth_api)
api_rest_v1.add_namespace(file_api)
api_rest_v1.add_namespace(append_api)

