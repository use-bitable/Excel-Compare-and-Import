import os
from uuid import uuid4
from flask import request, Flask, g, Response
from server.api import API_PATH_LIST
from server.log import logger, get_log_file_path, DEFAULT_LOG_CONFIG
from server.user import UserTokenMeta

TASK_ID_KEY = "TaskID"

def LogMiddleWare(app: Flask):
    """Log Middleware for the Flask application."""
    @app.before_request
    def log_init():
        """Log the request information."""
        if request.path in API_PATH_LIST:
          task_id = request.headers.get(TASK_ID_KEY, None)  
          if not task_id:
              task_id = uuid4().hex
          g.task_id = task_id
          global logger
          needs_authentication: bool = g.get("needs_authentication", True)
          is_authenticated: bool = g.get("is_authenticated", False)
          user_meta: UserTokenMeta = g.get("user_meta", None)
          if needs_authentication and is_authenticated and user_meta:
              g.logger = logger.bind(
                  request_path=request.path,
                  request_method=request.method,
                  user_id=user_meta.user_id,
                  tentant_key=user_meta.tenant_key,
                  base_id=user_meta.base_id,
                  product=user_meta.product
              )
              g.logger.add(
                  get_log_file_path(
                      user_meta.tenant_key,
                      user_meta.base_id,
                      user_meta.user_id,
                      task_id
                  ),
                  **DEFAULT_LOG_CONFIG,
              )
          else:
              g.logger = logger.bind(
                request_path=request.path,
                request_method=request.method
              )
          g.logger.info("Request received.")

    @app.after_request
    def after_request(response: Response):
        """Log the response information."""
        if g.get(TASK_ID_KEY, None):
          response.headers.set(TASK_ID_KEY, g.task_id)
        return response
    return app