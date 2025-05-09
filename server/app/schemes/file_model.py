"""The model of the upload API."""

from pydantic import BaseModel


class UploadResponseDataModel(BaseModel):
    """The model of the upload response data."""

    token: str


class StartUploadFileChunkRequestBodyModel(BaseModel):
    filename: str
    md5: str
    size: int
    chunks: int