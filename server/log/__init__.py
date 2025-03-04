import sys
from loguru import logger
from json import dumps
from .constants import *
from .utils import *

def serialize(record):
  res = {
    "timestamp": record["time"].timestamp(),
    "msg": record["message"],
    "level": record["level"].name,
    "file": record["file"].name,
    "context": record["extra"],
    "exception": record["exception"]
  }
  return dumps(res)

def patcher(record):
  record["extra"]["serialized"] = serialize(record)


logger.remove(0)
logger = logger.patch(patcher)
logger.add(
  sys.stderr, 
  format="{extra[serialized]}", 
  level="DEBUG"
)