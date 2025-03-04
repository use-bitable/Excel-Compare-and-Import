"""Test utils/file.py module."""
import os
import math
import shutil
from server.token import TokenManager
from server.file.core import FileManager, FileTokenMeta
from server.file.constants import FILE_CACHE_DIR, USER_LIMIT, SIZE_LIMIT
from server.file.utils import get_file_md5
from server.tests.utils import DEFAULT_SECURITY_KEY

fileTokenManager = TokenManager(
    FileTokenMeta,
    DEFAULT_SECURITY_KEY
)

fileManager = FileManager(
   FILE_CACHE_DIR,
   fileTokenManager,
   USER_LIMIT,
   SIZE_LIMIT
)

test_user = {
    "tenant_key": "tenant_key",
    "base_id": "base_id",
    "user_id": "user_id",
    "filename": "data.xlsx"
}


TEST_DIR = os.path.dirname(__file__)
TEST_FILE_PATH = os.path.join(TEST_DIR, './assets/data.xlsx')

def test_file():
    """Test file module"""
    with open(TEST_FILE_PATH, "rb") as f:
      data = f.read()
      file_token = fileManager.save_file(test_user["tenant_key"], test_user["base_id"], test_user["user_id"], test_user["filename"], data)
      file = fileManager.get_file(file_token)
      assert os.path.exists(file.file_path)
      fileManager.delete_file(file_token)
    chunk_size = 1 * 1024 * 1024
    total_size = os.path.getsize(TEST_FILE_PATH)
    chunks = math.ceil(total_size / chunk_size)
    token = fileManager.start_chunk(
        tenant_key="tenant_key",
        base_id="base_id",
        user_id="user_id",
        filename="data.xlsx",
        md5=get_file_md5(TEST_FILE_PATH),
        size=os.path.getsize(TEST_FILE_PATH),
        chunks=chunks
    )
    for i in range(1, chunks +1):
       start = (i - 1) * chunk_size
       end = min(total_size, start + chunk_size)
       with open(TEST_FILE_PATH, "rb") as f:
          f.seek(start)
          chunk_data = f.read(end - start)
          fileManager.save_file_chunk(token, i, chunk_data)
    file = fileManager.assemble_file_chunks(token)
    fileManager.delete_file(token)
    shutil.rmtree(FILE_CACHE_DIR)