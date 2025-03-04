import os
from pathlib import Path

LOG_ROOT_DIR_NAME=os.getenv("LOG_ROOT_DIR_NAME", "logs")
LOG_ROOT_DIR_PATH=os.path.join(Path().absolute(), LOG_ROOT_DIR_NAME)

DEFAULT_LOG_CONFIG = {
    "format": "{extra[serialized]}",
    "level": "DEBUG",
}