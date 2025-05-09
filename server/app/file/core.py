"""File module to manage files"""

import os
import shutil
import uuid
import glob
from typing import IO
from time import time
from dataclasses import dataclass
import orjson
from werkzeug.utils import secure_filename
from app.schemes import User
from app.token import TokenManager, TokenMeta, tokenclass
from app.utils import timestamp_s_to_ms
from .exceptions import (
    NoFileException,
    ChunkNotFoundException,
    InvalidateFileException,
    FileNumberLimitException,
    NoChunkMetaException,
    NoPermissionException,
)
from .constants import (
    FILE_META_FILE_NAME,
    ORIGIN_FILE_DIR_NAME,
    CHUNK_META_FILE_NAME,
    USER_LIMIT,
)
from .utils import (
    create_file,
    get_file_md5,
    read_json_file,
    read_file,
    get_file_from_url,
)


@tokenclass
class FileTokenMeta(TokenMeta):
    tenant_key: str
    base_id: str
    user_id: str
    filename: str
    created_time: int
    uuid: str
    type: str = "file"


@dataclass(frozen=True)
class FileMeta:
    md5: str
    created_time: int
    uuid: str
    token: str
    size: int


@dataclass
class ChunkMeta:
    md5: str
    created_time: int
    chunks: int
    total_size: int


@dataclass(frozen=True, slots=True)
class FileItem:
    token: str
    file_path: str
    dir_path: str
    md5: str
    created_time: int
    uuid: str
    size: int

    def read(self, mode: str = "rb+"):
        return read_file(self.file_path, mode=mode)

    def delete(self):
        shutil.rmtree(os.path.dirname(self.dir_path))


class FileManager:
    def __init__(
        self,
        root: str,
        token_manager: TokenManager[FileTokenMeta],
        user_limit: int = USER_LIMIT,
        size_limit: int = None,
    ):
        self.root = root
        self.token_manager = token_manager
        self.user_limit = user_limit
        self.size_limit = size_limit

    def get_file_path(
        self,
        tenant_key: str,
        base_id: str,
        user_id: str,
        created_time: int,
        uuid: str,
        filename: str,
    ):
        """Get the file path like: {root}/{tenant_key}/{user_id}/{base_id}/{created_time}/{uuid}/{ORIGIN_FILE_DIR}/{filename}"""
        return os.path.join(
            self.root,
            tenant_key,
            user_id,
            base_id,
            str(created_time),
            uuid,
            ORIGIN_FILE_DIR_NAME,
            secure_filename(filename),
        )

    def get_file_dir_from_file_path(self, file_path: str):
        return os.path.dirname(os.path.dirname(file_path))

    def get_file_path_from_token_meta(self, token_meta: FileTokenMeta) -> str:
        """Get the file path from token meta like: {root}/{tenant_key}/{user_id}/{base_id}/{created_time}/{uuid}/{ORIGIN_FILE_DIR}/{filename}"""
        return os.path.join(
            self.root,
            token_meta.tenant_key,
            token_meta.user_id,
            token_meta.base_id,
            str(token_meta.created_time),
            token_meta.uuid,
            ORIGIN_FILE_DIR_NAME,
            token_meta.filename,
        )

    def get_file_from_token(self, token: str) -> FileItem:
        token_meta = self.token_manager.decode_token(token)
        file_path = self.get_file_path_from_token_meta(token_meta)
        if not os.path.exists(file_path):
            raise NoFileException(f"Not Found file: {token}({file_path}).")
        file_dir = self.get_file_dir_from_file_path(file_path)
        file_meta = self.get_file_meta(file_dir)
        return FileItem(
            token=token,
            file_path=file_path,
            dir_path=file_dir,
            md5=file_meta.md5,
            created_time=file_meta.created_time,
            uuid=file_meta.uuid,
            size=file_meta.size,
        )

    def get_file(self, token: str, user: User) -> FileItem:
        """Get file from token"""
        file = self.get_file_from_token(token)
        if not os.path.exists(file.file_path):
            raise NoFileException(f"Not Found file: {token}({file.file_path}).")
        return file

    def save_file(
        self, tenant_key: str, base_id: str, user_id: str, filename: str, data: IO
    ):
        if not self.can_save_file(tenant_key, user_id, base_id):
            raise FileNumberLimitException(
                f"Each user is limited to upload {self.user_limit} files per base. "
            )
        if self.size_limit and len(data) > self.size_limit:
            raise InvalidateFileException(
                f"The size of file ({len(data) / (1024 * 1024)} MB) exceed file size limit ({self.size_limit / (1024 * 1024)} MB). "
            )
        uid = str(uuid.uuid4())
        created_time = timestamp_s_to_ms(time())
        file_token_meta = FileTokenMeta(
            tenant_key=tenant_key,
            base_id=base_id,
            user_id=user_id,
            created_time=created_time,
            uuid=uid,
            filename=filename,
        )
        file_path = self.get_file_path_from_token_meta(file_token_meta)
        token = self.token_manager.encode_token(file_token_meta)
        create_file(file_path, data)
        md5 = get_file_md5(file_path)
        size = os.path.getsize(file_path)
        file_meta = FileMeta(
            md5=md5, created_time=created_time, uuid=uid, token=token, size=size
        )
        meta_path = os.path.dirname(os.path.dirname(file_path))
        self.save_file_meta(meta_path, file_meta)
        return token

    def start_chunk(
        self,
        tenant_key: str,
        base_id: str,
        user_id: str,
        filename: str,
        md5: str,
        size: int,
        chunks: int,
    ):
        if not self.can_save_file(tenant_key, user_id, base_id):
            raise FileNumberLimitException(
                f"Each user is limited to upload {self.user_limit} files per base. "
            )
        if self.size_limit and size > self.size_limit:
            raise InvalidateFileException(
                f"Exceed file size limit ({self.size_limit / (1024 * 1024)} MB). "
            )
        uid = str(uuid.uuid4())
        created_time = timestamp_s_to_ms(time())
        file_token_meta = FileTokenMeta(
            tenant_key=tenant_key,
            base_id=base_id,
            user_id=user_id,
            created_time=created_time,
            uuid=uid,
            filename=filename,
        )
        file_path = self.get_file_path_from_token_meta(file_token_meta)
        token = self.token_manager.encode_token(file_token_meta)
        file_meta = FileMeta(
            md5=md5, created_time=created_time, uuid=uid, token=token, size=size
        )
        meta_path = os.path.dirname(os.path.dirname(file_path))
        self.save_file_meta(meta_path, file_meta)
        chunk_meta = ChunkMeta(
            md5=md5, created_time=created_time, chunks=chunks, total_size=size
        )
        create_file(
            os.path.join(meta_path, ORIGIN_FILE_DIR_NAME, CHUNK_META_FILE_NAME),
            orjson.dumps(chunk_meta),
        )
        return token

    def save_file_chunk(
        self,
        token: str,
        index: int,
        data: IO,
    ):
        token_meta = self.token_manager.decode_token(token)
        file_path = self.get_file_path_from_token_meta(token_meta)
        raw_dir = os.path.dirname(file_path)
        self.get_chunk_meta(raw_dir)
        chunk_path = os.path.join(raw_dir, str(index))
        if os.path.exists(chunk_path):
            return
        create_file(chunk_path, data)

    def check_file_chunk(self, token: str, index: int):
        file = self.get_file_from_token(token)
        chunk_path = os.path.join(os.path.dirname(file.file_path), str(index))
        return os.path.exists(chunk_path)

    def assemble_file_chunks(self, token: str):
        token_meta = self.token_manager.decode_token(token)
        file_path = self.get_file_path_from_token_meta(token_meta)
        chunk_meta = self.get_chunk_meta(os.path.dirname(file_path))
        chunks = chunk_meta.chunks
        raw_dir = os.path.dirname(file_path)
        chunk_paths: list[str] = []
        with open(file_path, "wb") as target:
            for i in range(1, chunks + 1):
                chunk_path = os.path.join(raw_dir, str(i))
                if not os.path.exists(chunk_path):
                    raise ChunkNotFoundException(f"Chunk {i} of {token} not found.")
                chunk_data = read_file(chunk_path, mode="rb")
                target.write(chunk_data)
                chunk_paths.append(chunk_path)
        for p in chunk_paths:
            os.remove(p)
        target_md5 = get_file_md5(file_path)
        if target_md5 != chunk_meta.md5:
            self.delete_file(token)
            raise InvalidateFileException(
                f"Assembled file's MD5({target_md5}) != upload file MD5({chunk_meta.md5})."
            )
        os.remove(os.path.join(os.path.dirname(file_path), CHUNK_META_FILE_NAME))
        file = self.get_file_from_token(token)
        return file

    def save_file_meta(self, meta_path: str, file_meta: FileMeta):
        create_file(
            os.path.join(meta_path, FILE_META_FILE_NAME),
            orjson.dumps(file_meta),
        )

    def get_file_meta(self, file_dir: str):
        meta = read_json_file(os.path.join(file_dir, FILE_META_FILE_NAME))
        return FileMeta(**meta)

    def get_chunk_meta(self, file_dir: str):
        try:
            meta = read_json_file(os.path.join(file_dir, CHUNK_META_FILE_NAME))
        except IOError:
            raise NoChunkMetaException(
                "Not found chunk meta, please use chunk start API first."
            )
        return ChunkMeta(**meta)

    def delete_file(self, token: str):
        file = self.get_file_from_token(token)
        shutil.rmtree(os.path.dirname(file.dir_path))

    def get_user_dir(
        self,
        tenant_key: str,
        user_id: str,
    ):
        return os.path.join(
            self.root,
            tenant_key,
            user_id,
        )

    def can_save_file(
        self,
        tenant_key: str,
        user_id: str,
        base_id: str,
    ):
        if self.user_limit is None:
            return True
        file_list = self.get_user_file_list(tenant_key, user_id, base_id)
        return len(file_list) < self.user_limit

    def get_user_file_list(
        self,
        tenant_key: str,
        user_id: str,
        base_id: str,
    ):
        user_dir = self.get_user_dir(tenant_key, user_id)
        base_dir = os.path.join(user_dir, base_id)
        glob_pattern = os.path.join(base_dir, "*", "*", FILE_META_FILE_NAME)
        files = glob.glob(glob_pattern)
        file_meta_list = [FileMeta(**read_json_file(file)) for file in files]
        return file_meta_list

    def save_file_from_url(
        self,
        url: str,
        tenant_key: str,
        base_id: str,
        user_id: str,
    ):
        data = get_file_from_url(url)
        filename = secure_filename((url.split("/")[-1]).split("?")[0])
        return self.save_file(tenant_key, base_id, user_id, filename, data)

    def get_user_manager(
        self, user: User, user_limit: int = None, size_limit: int = None
    ):
        """Get user file manager"""
        return UserFileManager(
            self.root,
            self.token_manager,
            user,
            user_limit or self.user_limit,
            size_limit or self.size_limit,
        )


class UserFileManager(FileManager):
    """User File Manager"""

    def __init__(
        self,
        root: str,
        token_manager: TokenManager,
        user: User,
        user_limit: int = USER_LIMIT,
        size_limit: int = None,
    ):
        super().__init__(root, token_manager, user_limit, size_limit)
        self.user = user

    def get_file_path(self, created_time: int, uuid: str, filename: str):
        user = self.user
        return super().get_file_path(
            user.tenant_key, user.base_id, user.user_id, created_time, uuid, filename
        )

    def save_file(self, filename: str, data: IO):
        user = self.user
        return super().save_file(
            user.tenant_key, user.base_id, user.user_id, filename, data
        )

    def get_file(self, token: str):
        file_meta = self.token_manager.decode_token(token)
        if self.verify_user(
            file_meta.tenant_key,
            file_meta.base_id,
            file_meta.user_id,
        ):
            return super().get_file(token, self.user)
        user = self.user
        raise NoPermissionException(
            f"User {user.tenant_key}/{user.base_id}/{user.user_id} has no permission to access file {token}."
        )

    def start_chunk(self, filename: str, md5: str, size: int, chunks: int):
        user = self.user
        return super().start_chunk(
            user.tenant_key, user.base_id, user.user_id, filename, md5, size, chunks
        )

    def verify_user(self, tenant_key: str, base_id: str, user_id: str):
        """Verify user"""
        user = self.user
        if (
            user.tenant_key != tenant_key
            or user.base_id != base_id
            or user.user_id != user_id
        ):
            return False
        return True
