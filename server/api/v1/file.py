"""Upload File API"""

from __future__ import annotations
from flask import g
from flask_restx import Resource, Namespace
from werkzeug.datastructures import FileStorage
from server.models import (
    upload_model,
    start_upload_chunk_model,
    upload_chunk_model,
    assemble_chunk_model,
    delete_file_model,
)
from server.utils import add_args
from server.user import UserTokenMeta
from server.file import (
    fileManager,
    CaculateMD5Exception,
    NoFileException,
    CreateFileException,
    CreateDirException,
    ChunkNotFoundException,
    InvalidateFileException,
    FileNumberLimitException,
)
from server.request import make_response, ResponseStatusCode
from ._constants import API_V1_LIST, DEFAULT_SUCCESS_MSG

FILE_API_NAMESPACE = "file"
FILE_API_META = API_V1_LIST[FILE_API_NAMESPACE]
file_api = Namespace(FILE_API_NAMESPACE, description=FILE_API_META["description"])
FILE_API_RESOURCES = FILE_API_META["resource"]

upload_parser = file_api.parser()
add_args(upload_parser, upload_model)


@file_api.route(FILE_API_RESOURCES["upload"]["path"])
@file_api.doc(FILE_API_RESOURCES["upload"]["description"])
class UploadAPI(Resource):
    """Upload API class."""

    @file_api.expect(upload_parser, validate=True)
    def post(self):
        """Upload file."""
        args = upload_parser.parse_args(strict=True)
        file: FileStorage = args.get("file")
        user_meta: UserTokenMeta = g.get("user_meta")
        try:
            token = fileManager.save_file(
                user_meta.tenant_key,
                user_meta.base_id,
                user_meta.user_id,
                args.get("filename"),
                file.stream.read(),
            )
            return (
                make_response(
                    code=ResponseStatusCode.SUCCESS,
                    data={"token": token},
                    msg=DEFAULT_SUCCESS_MSG,
                ),
                200,
            )
        except (FileNumberLimitException, InvalidateFileException) as e:
            msg = str(e)
            return (
                make_response(code=ResponseStatusCode.FILE_EXCEEDED_LIMIT, msg=msg),
                200,
            )


chunk_upload_parser = file_api.parser()
add_args(chunk_upload_parser, upload_chunk_model)


@file_api.route(FILE_API_RESOURCES["upload_chunk"]["path"])
@file_api.doc(FILE_API_RESOURCES["upload_chunk"]["description"])
class UploadChunkAPI(Resource):
    """Upload file chunk API class."""

    @file_api.expect(chunk_upload_parser, validate=True)
    def post(self):
        """Upload file chunk."""
        args = chunk_upload_parser.parse_args(strict=True)
        try:
            fileManager.save_file_chunk(
                args.get("token"), args.get("index"), self.get("file").stream.read()
            )
            return (
                make_response(code=ResponseStatusCode.SUCCESS, msg=DEFAULT_SUCCESS_MSG),
                200,
            )
        except Exception as e:
            pass


start_chunk_parser = file_api.parser()
add_args(start_chunk_parser, start_upload_chunk_model)


@file_api.route(FILE_API_RESOURCES["start_chunk"]["path"])
@file_api.doc(FILE_API_RESOURCES["start_chunk"]["description"])
class StartChunkUploadAPI(Resource):
    """Start upload file chunk API class."""

    @file_api.expect(start_chunk_parser, validate=True)
    def post(self):
        """Start upload file chunk."""
        args = start_chunk_parser.parse_args(strict=True)
        user_meta: UserTokenMeta = g.get("user_meta")
        try:
            token = fileManager.start_chunk(
                user_meta.tenant_key,
                user_meta.base_id,
                user_meta.user_id,
                args.get("filename"),
                args.get("md5"),
                args.get("size"),
                args.get("chunks"),
            )
            return (
                make_response(
                    code=ResponseStatusCode.SUCCESS,
                    data={"token": token},
                    msg=DEFAULT_SUCCESS_MSG,
                ),
                200,
            )
        except Exception as e:
            pass


assemble_chunk_parser = file_api.parser()
add_args(assemble_chunk_parser, assemble_chunk_model)


@file_api.route(FILE_API_RESOURCES["assemble_chunk"]["path"])
@file_api.doc(FILE_API_RESOURCES["assemble_chunk"]["description"])
class AssembleChunkAPI(Resource):
    """Assemble file chunk API class."""

    @file_api.expect(assemble_chunk_parser, validate=True)
    def post(self):
        """Assemble file chunk."""
        args = assemble_chunk_parser.parse_args(strict=True)
        try:
            token = fileManager.assemble_file_chunks(args.get("token"))
            return (
                make_response(
                    code=ResponseStatusCode.SUCCESS,
                    data={"token": token},
                    msg=DEFAULT_SUCCESS_MSG,
                ),
                200,
            )
        except Exception as e:
            pass


delete_parser = file_api.parser()
add_args(delete_parser, delete_file_model)


@file_api.route(FILE_API_RESOURCES["delete"]["path"])
@file_api.doc(FILE_API_RESOURCES["delete"]["description"])
class DeleteFileAPI(Resource):
    """Delete file API class."""

    @file_api.expect(delete_parser, validate=True)
    def post(self):
        """Delete file."""
        args = delete_parser.parse_args(strict=True)
        try:
            fileManager.delete_file(args.get("token"))
            return (
                make_response(code=ResponseStatusCode.SUCCESS, msg=DEFAULT_SUCCESS_MSG),
                200,
            )
        except Exception as e:
            g.logger.error(f"Error when delete file: {e}")
            return (
                make_response(
                    code=ResponseStatusCode.INTERNAL_ERROR,
                    msg="Internal Error when delete file.",
                ),
                200,
            )
