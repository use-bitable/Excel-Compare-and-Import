from typing import Literal
from pydantic import BaseModel


class User(BaseModel):
    user_id: str
    tenant_key: str
    base_id: str
    product: Literal["FEISHU", "LARK"] = "FEISHU"
