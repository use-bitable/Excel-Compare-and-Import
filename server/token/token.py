import os
import json
from Crypto.Cipher import AES
from dataclasses import dataclass
from typing import Callable
from .constants import ENCRYPT_MODE, DEFAULT_KEY_NAME
from .exceptions import NoSecutityKeyException

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

def encrypt_token(value: str, security_key: str) -> str:
    """Encrypt token

    Args:
        value (str): Value to encrypt
        security_key (str): Security key

    Returns:
        str: Encrypted token
    """
    if not security_key:
        raise NoSecutityKeyException("Security key is not offered.")
    cipher = AES.new(security_key.encode(), ENCRYPT_MODE)
    token_bytes = cipher.encrypt(parse_16_str(value).encode())
    return token_bytes.hex()

def decrypt_token(value: str, security_key: str) -> str:
    """Decrypt token

    Args:
        value (str): Value to decrypt
        security_key (str): Security key

    Returns:
        str: Decrypted token
    """
    if not security_key:
        raise NoSecutityKeyException("Security key is not offered.")
    cipher = AES.new(security_key.encode(), ENCRYPT_MODE)
    token_bytes = bytes.fromhex(value)
    return cipher.decrypt(token_bytes).decode(encoding="utf-8").strip()

@dataclass(frozen=True)
class TokenMeta:
    """Token meta nase class"""

    def __eq__(self, value: object) -> bool:
        if not isinstance(value, TokenMeta):
            return False
        return self.__match_args__ == value.__match_args__

def encode_token[T](
        meta: T,
        security_key: str
) -> str:
    """Encode token

    Args:
        meta (TokenMeta): Token meta
        security_key (str): Security key

    Returns:
        str: Encrypted token
    """
    if not security_key:
        raise NoSecutityKeyException("Security key is not offered.")
    return encrypt_token(json.dumps(meta.__dict__, sort_keys=True), security_key)

def decode_token[T](
        token: str,
        security_key: str,
        meta_class: T
) -> T:
    """Decode token

    Args:
        token (str): Token
        security_key (str): Security key
        meta_class (TokenMeta): Token meta class

    Returns:
        TokenMeta: Token meta
    """
    if not security_key:
        raise NoSecutityKeyException("Security key is not offered.")
    return meta_class(
        **json.loads(
            decrypt_token(token, security_key)
        )
    )

class TokenManager[T]:
    def __init__(
            self,
            meta_class: T,
            security_key: str,
            encode_method: Callable[[T, str], str] = encode_token,
            decode_method: Callable[[str, str, T], T] = decode_token
    ):
        self.meta_class = meta_class
        if not security_key:
            security_key = os.getenv(DEFAULT_KEY_NAME, None)
            if not security_key:
                raise NoSecutityKeyException("Security key is not offered.")
        self.security_key = security_key
        self.encode_method = encode_method
        self.decode_method = decode_method
    
    def encode_token(self, meta: T) -> str:
        """Encode token
    
        Args:
            meta (TokenMeta): Token meta
    
        Returns:
            str: Encrypted token
        """
        return self.encode_method(meta, self.security_key)

    def decode_token(self, token: str) -> T:
        """Decode token
    
        Args:
            token (str): Token
    
        Returns:
            TokenMeta: Token meta
        """
        return self.decode_method(token, self.security_key, self.meta_class)
    
def tokenclass(cls: any):
    return dataclass(cls, frozen=True, eq=False)