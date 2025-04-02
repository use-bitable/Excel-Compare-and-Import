from flask import g
from flask_restx import Resource, Namespace
from server.request import make_response, ResponseStatusCode
from server.user import get_user_token_manager, UserTokenMeta
from server.models import data_preview_model
from server.data_parser import dataParser
from server.utils import add_args
from ._constants import API_V1_LIST

DATA_API_NAMESPACE = "data"
DATA_API_META = API_V1_LIST[DATA_API_NAMESPACE]
data_api = Namespace(DATA_API_NAMESPACE, description=DATA_API_META["description"])
DATA_API_RESOURCES = DATA_API_META["resource"]

preview_parser = data_api.parser()
add_args(preview_parser, data_preview_model)


@data_api.route(DATA_API_RESOURCES["preview"]["path"])
@data_api.doc(DATA_API_RESOURCES["preview"]["description"])
class DataPreviewAPI(Resource):
    """Preview data API class."""

    @data_api.expect(preview_parser, validate=True)
    def post(self):
        """Paginate preview data."""
        args = preview_parser.parse_args(strict=True)
        return args
