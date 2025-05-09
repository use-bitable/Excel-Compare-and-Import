from typing import Callable
from flask import Flask
from .auth import AuthenticationMiddleware
from .log import LogMiddleWare


def set_middlewares(app: Flask, middlewares: list[Callable[[Flask], Flask]]):
    """Initialize the middlewares.

    Args:
        app (Flask): The Flask application.
        middlewares (list[Callable[[Flask], Flask]]): The list of middlewares to be initialized.

    Returns:
        Flask: The Flask application with the middlewares initialized
    """
    for middleware in middlewares:
        app = middleware(app)
    return app
