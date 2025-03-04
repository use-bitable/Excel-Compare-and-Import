import os
import base64
import json
from Crypto.Cipher import AES
from dataclasses import dataclass

ENV_KEY_NAME = "SECRET_KEY"
ENCRYPT_MODE = AES.MODE_ECB
DEFAULT_KEY = "475838696ff6f306ee10de69870c8dc9"

def parse_16_str(value: str, placeholder: str = " "):
    """Parse 16 string

    Args:
        value (str): Value to parse
        placeholder (str, optional): Placeholder. Defaults to " ".

    Returns:
        str: Parsed string
    """
    v = value
    if len(v) % 16 != 0:
        v += placeholder * (16 - len(v) % 16)
    return v

def encrypt_token(value: str) -> str:
    """Encrypt token

    Args:
        value (str): Value to encrypt

    Returns:
        str: Encrypted token
    """
    key = os.getenv("SECRET_KEY", DEFAULT_KEY)
    cipher = AES.new(key.encode(), ENCRYPT_MODE)
    token_bytes = cipher.encrypt(parse_16_str(value).encode())
    return base64.encodebytes(token_bytes).decode(encoding="utf-8")

def decrypt_token(value: str) -> str:
    """Decrypt token

    Args:
        value (str): Value to decrypt

    Returns:
        str: Decrypted token
    """
    key = os.getenv("SECRET_KEY", DEFAULT_KEY)
    cipher = AES.new(key.encode(), ENCRYPT_MODE)
    token_bytes = base64.decodebytes(value.encode())
    return cipher.decrypt(token_bytes).decode(encoding="utf-8").strip()

@dataclass
class TaskTokenMeta:
    """Task token meta"""
    base_id: str
    user_id: str
    timestamp: int

    def __eq__(self, value: object) -> bool:
        if not isinstance(value, TaskTokenMeta):
            return False
        return self.base_id == value.base_id and self.user_id == value.user_id and self.timestamp == value.timestamp

def encode_task_token(meta: TaskTokenMeta) -> str:
    """Task token

    Args:
        meta (TokenMeta): Token meta

    Returns:
        str: Encrypted token
    """
    return encrypt_token(json.dumps(meta.__dict__))

def decode_task_token(token: str) -> TaskTokenMeta:
    """Decode task token

    Args:
        token (str): Token

    Returns:
        TokenMeta: Token meta
    """
    return TaskTokenMeta(**json.loads(decrypt_token(token)))