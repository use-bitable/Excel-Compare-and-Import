from typing import TypedDict, Optional, Any

class APIResourceItem(TypedDict):
    """API Resource Item"""
    method: str
    path: str
    description: Optional[str]
    need_auth: Optional[bool]

class APIMeta(TypedDict):
    """API Meta"""
    namespace: str
    version: str
    description: str
    resource: dict[str, APIResourceItem]