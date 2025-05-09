from abc import abstractmethod
from server.schemes import ResponseStatusCode

class NormalApiException(Exception):
    """
    Base class for all exceptions raised by the API.
    """

    @property
    @abstractmethod
    def code(self) -> ResponseStatusCode:
        """
        The HTTP status code to return.
        """
        pass