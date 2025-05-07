from typing import Annotated
from fastapi import APIRouter, File, UploadFile, status, Depends, Form, Body, Query
from server.schemes import (
    BasicResponseModel,
    UploadResponseDataModel,
    ResponseStatusCode,
    User,
    StartUploadFileChunkRequestBodyModel,
)
from server.api.types import APIResourceItem

from server.api.utils import make_response
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
from ..exceptions import (
    ApiFileExceedLimitException,
    ApiInvalidFileException,
    ApiSaveFileChunkException,
    UnAuthorizedException,
)
from .._constants import API_V1_LIST
from ..dependencies import get_current_user

FILE_API_NAMESPACE = "file"
FILE_API_META = API_V1_LIST[FILE_API_NAMESPACE]
FILE_API_RESOURCES: APIResourceItem = FILE_API_META["resource"]
router = APIRouter(
    prefix=FILE_API_META["prefix"],
    tags=FILE_API_META["tags"],
)


@router.post(
    FILE_API_RESOURCES["upload"]["path"],
    status_code=status.HTTP_200_OK,
    response_model=BasicResponseModel[UploadResponseDataModel],
)
async def upload(
    file: Annotated[UploadFile, File(description="Uploaded File")],
    user: User = Depends(get_current_user),
):
    try:
        user_file_manager = fileManager.get_user_manager(user)
        token = user_file_manager.save_file(
            file.filename,
            file.file.read(),
        )
        return make_response(
            code=ResponseStatusCode.SUCCESS,
            data={"token": token},
        )
    except FileNumberLimitException as e:
        raise ApiFileExceedLimitException(str(e)) from e
    except InvalidateFileException as e:
        raise ApiInvalidFileException(str(e)) from e


@router.post(
    FILE_API_RESOURCES["upload_chunk"]["path"],
    status_code=status.HTTP_200_OK,
    response_model=BasicResponseModel[None],
)
async def upload_chunk(
    file: Annotated[UploadFile, File(description="Uploaded File Chunk")],
    user: User = Depends(get_current_user),
    token: str = Form(description="File Token"),
    index: int = Form(description="Chunk Index"),
):
    if not user:
        raise UnAuthorizedException("unauthorized")
    try:
        user_file_manager = fileManager.get_user_manager(user)
        user_file_manager.save_file_chunk(
            token,
            index,
            file.file.read(),
        )
        return make_response()
    except Exception as e:
        raise ApiSaveFileChunkException(str(e)) from e


@router.post(
    FILE_API_RESOURCES["start_chunk"]["path"],
    status_code=status.HTTP_200_OK,
    response_model=BasicResponseModel[UploadResponseDataModel],
)
async def start_chunk(
    chunk_meta: Annotated[StartUploadFileChunkRequestBodyModel, Body()],
    user: User = Depends(get_current_user),
):
    if not user:
        raise UnAuthorizedException("unauthorized")
    try:
        user_file_manager = fileManager.get_user_manager(user)
        file_token = user_file_manager.start_chunk(
            chunk_meta.filename,
            chunk_meta.md5,
            chunk_meta.size,
            chunk_meta.chunks,
        )
        return make_response(
            data=UploadResponseDataModel(token=file_token).model_dump()
        )
    except Exception as e:
        raise ApiSaveFileChunkException(str(e)) from e


@router.post(
    FILE_API_RESOURCES["assemble_chunk"]["path"],
    status_code=status.HTTP_200_OK,
    response_model=BasicResponseModel[UploadResponseDataModel],
)
async def assemble_chunk(
    token: Annotated[str, Query()],
    user: User = Depends(get_current_user),
):
    if not user:
        raise UnAuthorizedException("unauthorized")
    try:
        user_file_manager = fileManager.get_user_manager(user)
        user_file_manager.assemble_file_chunks(token)
        return make_response(data=UploadResponseDataModel(token=token).model_dump())
    except Exception as e:
        raise ApiSaveFileChunkException(str(e)) from e


@router.post(
    FILE_API_RESOURCES["delete"]["path"],
    status_code=status.HTTP_200_OK,
    response_model=BasicResponseModel[None],
)
async def delete(
    token: Annotated[str, Query()],
    user: User = Depends(get_current_user),
):
    if not user:
        raise UnAuthorizedException("unauthorized")
    try:
        fileManager.delete_file(token)
        return make_response()
    except Exception as e:
        raise ApiSaveFileChunkException(str(e)) from e
