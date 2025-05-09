from typing import IO
from baseopensdk import BaseClient, FEISHU_DOMAIN, LARK_DOMAIN
from baseopensdk.api.base.v1 import GetAppRequestBuilder
from baseopensdk.api.base.v1.resource.app_table import (
    ListAppTableRequest,
    ListAppTableResponse,
)
from baseopensdk.api.drive.v1.resource.media import (
    UploadAllMediaRequest,
)
from baseopensdk.api.drive.v1.model.upload_all_media_request_body import (
    UploadAllMediaRequestBody,
)
from baseopensdk.api.base.v1.model.app_table import AppTable
from server.utils import paginate
from server.events import (
    EventsManager,
)
from .table import IBaseTable
from .field import FieldMap
from .const import BASE_PRODUCT, MAX_LIST_TABLE_LIMIT
from .types import BaseProduct
from .events import (
    BaseInitContext,
    OnBaseInitEvent,
    OnBaseGetTableListEvent,
)
from .exceptions import (
    BaseClientInitException,
    VerifyPersonalBaseTokenException,
    UploadMediaException,
    ListTableException,
    GetTableException,
)

BASE_DOMAIN = {
    "FEISHU": FEISHU_DOMAIN,
    "LARK": LARK_DOMAIN,
}


def create_client(
    base_id: str,
    personal_base_token: str,
    product: BaseProduct = "FEISHU",
) -> BaseClient:
    """Create a Base client."""
    if base_id is None or personal_base_token is None:
        raise BaseClientInitException(
            "Base ID and Personal Base Token must be provided"
        )
    if not (product in BASE_PRODUCT):
        raise BaseClientInitException(f"Product must be one of {BASE_PRODUCT}")
    return (
        BaseClient.builder()
        .app_token(base_id)
        .personal_base_token(personal_base_token)
        .domain(BASE_DOMAIN[product.upper()])
        .build()
    )


def query_list_tables(client: BaseClient, page_size: int = MAX_LIST_TABLE_LIMIT):
    def query(page_token: str | None):
        req: ListAppTableRequest = ListAppTableRequest.builder().page_size(page_size)
        if not (page_token is None):
            req.page_token(page_token)
        res: ListAppTableResponse = client.base.v1.app_table.list(req.build())
        if not res.success():
            raise ListTableException(f"Error[{res.code}]: {res.msg}")
        return (res.data.page_token, res.data.items, res.data.has_more, res.data.total)

    return query


class IBase:
    name: str
    """Name of the base"""
    revision: int
    """Version of the base, incrementing on every change"""
    is_advanced: bool
    """Is the advanced privileges enabled"""
    time_zone: str
    """Time zone of the base"""
    tenant_key: str
    """Tenant key of the organization"""
    user_id: str
    """User ID of the user"""
    client: BaseClient
    """Base client"""
    _tables: dict[str, IBaseTable]
    """Table cache"""
    _table_map: dict[str, AppTable]
    """Table map cache"""

    def __init__(
        self,
        base_id: str,
        personal_base_token: str,
        tenant_key: str,
        user_id: str,
        client: BaseClient | None = None,
        product: BaseProduct = "FEISHU",
        events_manager: EventsManager = None,
    ):
        if events_manager is None:
            self.events = EventsManager(self)
        else:
            events_manager.init(self)
        with self.events.context(
            OnBaseInitEvent,
            context_data=BaseInitContext(
                base_id=base_id,
                tenant_key=tenant_key,
                user_id=user_id,
                product=product,
            ),
        ):
            self.client = (
                create_client(base_id, personal_base_token, product)
                if client is None
                else client
            )
            self.tenant_key = tenant_key
            self.user_id = user_id
            meta = self._verify_personal_base_token()
            if meta is None:
                raise BaseClientInitException("Failed to get base meta")
            self.name, self.revision, self.is_advanced, self.time_zone = (
                meta.name,
                meta.revision,
                meta.is_advanced,
                meta.time_zone,
            )

    def _verify_personal_base_token(self):
        req = GetAppRequestBuilder().build()
        res = self.client.base.v1.app.get(req)
        if not res.success():
            raise VerifyPersonalBaseTokenException(f"Error[{res.code}]: {res.msg}")
        return res.data.app

    def upload_file(self, file: str | IO, filename: str, size: int):
        if isinstance(file, str):
            with open(file, "rb") as f:
                return self.upload_file(f, filename, size)
        req_body = (
            UploadAllMediaRequestBody.builder()
            .file_name(filename)
            .size(size)
            .file(file)
            .build()
        )
        req = UploadAllMediaRequest.builder().request_body(req_body).build()
        res = self.client.drive.v1.media.upload_all(req)
        if not res.success():
            raise UploadMediaException(f"Error[{res.code}]: {res.msg}")
        file_token = res.data.file_token
        return file_token

    def get_table_map(self):
        if self._table_map is None:
            with self.events.context(OnBaseGetTableListEvent) as trigger:
                self._table_map = {
                    t.table_id: t
                    for t in paginate(
                        query_list_tables(self.client),
                        on_page=lambda x: trigger.process(
                            success=x["loaded"],
                            total=x["total"],
                        ),
                    )
                }
        return self._table_map

    def get_table(
        self,
        table_id: str,
        field_maps: list[FieldMap] = None,
        index_field: list[str] = None,
        view_id: str = None,
    ):
        if table_id in self._tables:
            return self._tables[table_id]
        if self._table_map is None:
            self.get_table_map()
        if table_id not in self._table_map:
            raise GetTableException(f"Table {table_id} not found")
        t_meta = self._table_map[table_id]
        table = IBaseTable(
            self,
            t_meta.table_id,
            t_meta.name,
            field_maps=field_maps,
            index_field=index_field,
            view_id=view_id,
        )
        self._tables[table_id] = table
        return table
