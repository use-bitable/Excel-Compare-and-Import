"""Append API module."""

from flask_restx import Resource, Namespace
from werkzeug.datastructures import FileStorage
from server.utils import add_args

append_api = Namespace("append", description="Append Records")
append_file_parser = append_api.parser()
# add_args(append_file_parser, append_file_model)
ALLOWED_EXTENSIONS = ["xls", "xlsx", "csv", "json"]
# UPLOAD_FILE_CHECKER = allowed_file(allowed_extensions=ALLOWED_EXTENSIONS)


@append_api.route("/file")
@append_api.doc("Append records from .xls,.xlsx,.csv,.json file.")
class AppendFileAPI(Resource):
    """Append API class."""

    @append_api.expect(append_file_parser)
    def post(self):
        """Get append records."""
        args = append_file_parser.parse_args()
        print(args)
        file: FileStorage = args.get("file")
        if not file:
            return "No file", 400
        # if file.content_length == 0 or not UPLOAD_FILE_CHECKER(file):
        #     return "Invalid file", 400
        return "Get append records"
