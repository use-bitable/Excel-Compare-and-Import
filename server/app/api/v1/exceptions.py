from app.schemes import ResponseStatusCode
from app.api.exceptions import NormalApiException


class ApiFileExceedLimitException(NormalApiException):
    """
    Exception raised when files uploaded by user exceeds the allowed number limit.
    """

    code = ResponseStatusCode.FILE_EXCEEDED_LIMIT


class ApiInvalidFileException(NormalApiException):
    """
    Exception raised when the file is not invalided.
    """

    code = ResponseStatusCode.INVALIDATE_File

class ApiAuthenticationFailedException(NormalApiException):
    """
    Exception raised when the user authentication failed.
    """

    code = ResponseStatusCode.AUTHORIZATION_FAILED


class ApiSaveFileChunkException(NormalApiException):
    """
    Exception raised when the file chunk cannot be saved.
    """

    code = ResponseStatusCode.SAVE_FILE_CHUNK_FAILED


class UnAuthorizedException(NormalApiException):
    """
    Exception raised when the user is not authorized.
    """

    code = ResponseStatusCode.UNAUTHORIZED


class ApiDeleteFileException(NormalApiException):
  """
  Exception raised when delete file failed
  """

  code = ResponseStatusCode.DELETE_FILE_FAILED