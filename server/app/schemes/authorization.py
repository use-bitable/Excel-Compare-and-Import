from typing import Literal
from pydantic import BaseModel, Field


class UserTokenMetaModel(BaseModel):
    """
    User token model for API authorization.
    """

    tenant_key: str
    base_id: str
    user_id: str
    product: Literal["FEISHU", "LARK"] = Field(
        default="FEISHU", description="The product type."
    )


class UserTokenResponseDataModel(BaseModel):
    """
    User token response data model for API authorization.
    """

    access_token: str
    token_type: str = Field(default="bearer", description="The type of the token.")