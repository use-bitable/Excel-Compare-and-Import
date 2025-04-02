import os
from pathlib import Path

FILE_SECURITY_KEY_NAME = "FILE_SECURITY_KEY"
BASE_DIR = Path().absolute()
FILE_CACHE_DIR_NAME = os.getenv("FILE_CACHE_DIR_NAME", "file_cache")
FILE_CACHE_DIR = os.path.join(BASE_DIR, FILE_CACHE_DIR_NAME)
FILE_META_FILE_NAME = os.getenv("FILE_META_FILE_NAME", "_meta.json")
ORIGIN_FILE_DIR_NAME = os.getenv("ORIGIN_FILE_DIR_NAME", "_raw_file")
FILE_EXPIRED_TIME = int(os.getenv("FILE_EXPIRED_TIME", 24 * 60 * 60 * 1000))
USER_LIMIT = int(os.getenv("FILE_NUMBER_LIMIT", 3))
ENV_SIZE_LIMIT = os.getenv("FILE_SIZE_LIMIT", None)
SIZE_LIMIT = int(ENV_SIZE_LIMIT) if ENV_SIZE_LIMIT is not None else None

# multipart upload
CHUNK_META_FILE_NAME = os.getenv("FILE_CHUNK_META_FILE_NAME", "_chunk_meta.json")
