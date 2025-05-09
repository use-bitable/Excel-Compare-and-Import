from enum import Enum, unique
from typing import Optional
from pydantic import BaseModel, Field


@unique
class ResponseStatusCode(int, Enum):
    SUCCESS = 0
    """Success response code."""
    INVALIDATE_PARAMS = 1
    """Invalid parameters response code."""
    INTERNAL_ERROR = 2
    """Internal server error response code."""

    # file 10xx
    FILE_EXCEEDED_LIMIT = 1001
    """File exceeded limit response code."""
    INVALIDATE_File = 1002
    """Invalid file response code."""
    SAVE_FILE_CHUNK_FAILED = 1003
    """Save file chunk failed response code."""
    DELETE_FILE_FAILED = 1004
    """Delete file failed response code."""

    # auth 20xx
    UNAUTHORIZED = 2001
    """Unauthorized response code."""
    INVALIDATE_TOKEN = 2002
    """Invalid token response code."""
    NO_PERSONAL_BASE_TOKEN = 2003
    """No personal base token response code."""
    AUTHORIZATION_FAILED = 2004
    """Authorization failed response code."""


class BasicResponseModel[D: (dict, None)](BaseModel):
    """
    Base model for API responses.
    """

    code: ResponseStatusCode = Field(description="Response status code.")
    message: Optional[str] = None
    data: Optional[D] = None
