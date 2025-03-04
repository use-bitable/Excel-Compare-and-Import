from baseopensdk.api.base.v1 import GetAppRequest, GetAppRequestBuilder
from .client import create_client
from .const import BASE_PRODUCT
from .exception import VerifyPersonalBaseTokenException



def verify_personalbasetoken(
    token: str,
    base_id: str,
    product: BASE_PRODUCT = "FEISHU",
):
    client = create_client(base_id, token, product)
    request: GetAppRequest = GetAppRequestBuilder().build()
    response = client.base.v1.app.get(request)
    if response.success():
        return True
    raise VerifyPersonalBaseTokenException(response.msg)
    