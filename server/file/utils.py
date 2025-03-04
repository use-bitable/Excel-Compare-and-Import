import os
import hashlib
from typing import IO
from json import loads
from .exceptions import (
   CreateDirException, 
   CreateFileException, 
   CaculateMD5Exception
)

def create_file(filename: str, data: IO, mode: str = "wb+", encoding: str | None = None):
  """Create file

  Args:
      filename (str): file path
      data (IO): file data
      mode (str, optional): open file mode. Defaults to "wb+".
      encoding (str | None, optional): file encoding. Defaults to None.
  """
  dirname = os.path.dirname(filename)
  need_mkdir = not os.path.exists(dirname)
  if need_mkdir:
      try:
        os.makedirs(dirname, exist_ok=True)
      except Exception as e:
         raise CreateDirException(f"Create {dirname} error: {e}")
  try:
    with open(filename, mode) as f:
        f.write(data)
  except Exception as e:
     raise CreateFileException(f"Create file {filename} error: {e}")

def get_file_md5(filename: str):
  """Caculate File MD5

  Args:
      filename (str): file path

  Returns:
      str: MD5
  """
  try:
    h = hashlib.md5()
    with open(filename, 'rb') as f:
        while chunk := f.read(128 * h.block_size):
            h.update(chunk)
    return h.digest().hex()
  except Exception as e:
    raise CaculateMD5Exception(f"Caculate {filename} MD5 error: {e}")

def read_file(file: str, mode: str="rb+"):
   with open(file, mode=mode) as f:
      return f.read()

def read_json_file(file: str, mode: str="r"):
   return loads(read_file(file, mode=mode))
