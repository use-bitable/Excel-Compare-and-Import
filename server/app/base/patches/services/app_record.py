from typing import Optional
from baseopensdk.core.const import UTF_8, CONTENT_TYPE
from baseopensdk.core import JSON
from baseopensdk.api.base.v1.resource import AppTableRecord
from baseopensdk.core.token import verify
from baseopensdk.core.model import Config, RequestOption, RawResponse
from baseopensdk.core.http import Transport
from ..search_app_table_record_request import SearchAppTableRecordRequest
from ..search_app_table_record_response import SearchAppTableRecordResponse


def search(
    self: AppTableRecord,
    request: SearchAppTableRecordRequest,
    option: Optional[RequestOption] = None,
) -> SearchAppTableRecordResponse:
    if option is None:
        option = RequestOption()

    # 鉴权、获取token
    verify(self.config, request, option)

    # 发起请求
    resp: RawResponse = Transport.execute(self.config, request, option)

    # 反序列化
    response: SearchAppTableRecordResponse = JSON.unmarshal(
        str(resp.content, UTF_8), SearchAppTableRecordResponse
    )
    response.raw = resp

    return response
