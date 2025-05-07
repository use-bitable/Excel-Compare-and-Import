from typing import TypedDict, Optional
from pydantic import BaseModel


class APIResourceItem(BaseModel):
    """API Resource Item"""

    method: str
    path: str
    description: Optional[str]
    need_auth: Optional[bool]


class APIMeta(BaseModel):
    """API Meta"""

    namespace: str
    version: str
    tags: list[str]
    prefix: str
    description: str
    resource: dict[str, APIResourceItem]
