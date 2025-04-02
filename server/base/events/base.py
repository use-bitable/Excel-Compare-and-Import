from typing import Optional, TypedDict
from server.events import Event, EventStatus, EventData, EventMsg
from ..types import BaseProduct

BASE_INIT_EVENT_NAME = "base_init"

BASE_INIT_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start initializing base",
        "zh": "开始初始化多维表格",
    },
    EventStatus.SUCCESS: {
        "en": "Base initialized",
        "zh": "多维表格初始化完成",
    },
    EventStatus.FAILED: {
        "en": "Failed to initialize base",
        "zh": "多维表格初始化失败",
    },
}


class BaseInitContext(TypedDict):
    base_id: str
    tenant_key: str
    user_id: str
    product: BaseProduct


class OnBaseInitEvent(Event[EventData, BaseInitContext]):
    """On base init event"""

    name = BASE_INIT_EVENT_NAME
    msg_template = BASE_INIT_MSG

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData] = None,
        context: Optional[BaseInitContext] = None,
    ):
        super().__init__(id, status, data, context)


BASE_GET_TABLE_LIST_EVENT_NAME = "base_get_table_list"
BASE_GET_TABLE_LIST_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start getting table list",
        "zh": "开始获取数据表列表",
    },
    EventStatus.SUCCESS: {
        "en": "Successfully got table list",
        "zh": "成功获取数据表列表",
    },
    EventStatus.FAILED: {
        "en": "Failed to get table list",
        "zh": "获取数据表列表失败",
    },
    EventStatus.PROCESSING: {
        "en": "Getting table list",
        "zh": "获取数据表列表中",
    },
}


class BaseGetTableListContext(TypedDict):
    base_id: str
    tenant_key: str
    user_id: str


class OnBaseGetTableListEvent(Event[EventData, BaseGetTableListContext]):
    """On base get tables event"""

    name = BASE_GET_TABLE_LIST_EVENT_NAME
    msg_template = BASE_GET_TABLE_LIST_MSG

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData] = None,
        context: Optional[BaseGetTableListContext] = None,
    ):
        super().__init__(id, status, data, context)
