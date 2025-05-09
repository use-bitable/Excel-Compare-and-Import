from typing import Optional, TypedDict
from app.events import Event, EventStatus, EventData, EventMsg

BASE_TABLE_INIT_EVENT_NAME = "base_table_init"
DATA_TABLE_INIT_EVENT_NAME = "data_table_init"


class BaseTableInitContext(TypedDict):
    """On base table init context"""

    table_id: str
    name: str
    view_id: Optional[str] = None


ON_BASE_TABLE_INIT_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start initializing base table {name}[{table_id}]",
        "zh": "开始初始化数据表 {name}[{table_id}]",
    },
    EventStatus.SUCCESS: {
        "en": "Base table {name}[{table_id}] initialized",
        "zh": "数据表 {name}[{table_id}] 初始化完成",
    },
    EventStatus.FAILED: {
        "en": "Failed to initialize base table {name}[{table_id}]",
        "zh": "数据表 {name}[{table_id}] 初始化失败",
    },
}


class OnBaseTableInitEvent(Event[EventData, BaseTableInitContext]):
    """On base table init event"""

    name = BASE_TABLE_INIT_EVENT_NAME
    msg_template = ON_BASE_TABLE_INIT_MSG

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData],
        context: Optional[BaseTableInitContext],
    ):
        super().__init__(id, status, data, context)


class DataTableInitContext(TypedDict):
    """On data table init context"""

    name: str


ON_DATA_TABLE_INIT_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start initializing data source {name}",
        "zh": "开始初始化数据源 {name}",
    },
    EventStatus.SUCCESS: {
        "en": "Data source {name} initialized",
        "zh": "数据源 {name} 初始化完成",
    },
    EventStatus.FAILED: {
        "en": "Failed to initialize data source {name}",
        "zh": "数据源 {name} 初始化失败",
    },
}


class OnDataTableInitEvent(Event[EventData, DataTableInitContext]):
    """On data table init event"""

    name = DATA_TABLE_INIT_EVENT_NAME
    msg_template = ON_DATA_TABLE_INIT_MSG

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData],
        context: Optional[DataTableInitContext],
    ):
        super().__init__(id, status, data, context)


BASE_TABLE_LOAD_RECORDS_EVENT_NAME = "base_table_load_records"

ON_BASE_TABLE_LOAD_RECORDS_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start loading base table {table_name}[{table_id}] records",
        "zh": "开始加载数据表 {table_name}[{table_id}] 记录",
    },
    EventStatus.SUCCESS: {
        "en": "Base table {table_name}[{table_id}] records loaded",
        "zh": "加载数据表 {table_name}[{table_id}] 记录完成",
    },
    EventStatus.FAILED: {
        "en": "Failed to load base table {table_name}[{table_id}] records",
        "zh": "加载数据表 {table_name}[{table_id}] 记录失败",
    },
    EventStatus.PROCESSING: {
        "en": "Loading base table {table_name}[{table_id}] records",
        "zh": "加载数据表 {table_name}[{table_id}] 记录中",
    },
}


class BaseTableLoadRecordsContext(TypedDict):
    """On base table load records context"""

    table_id: str
    table_name: str


class OnBaseTableLoadRecordsEvent(Event[EventData, BaseTableLoadRecordsContext]):
    """On base table load records event"""

    name = BASE_TABLE_LOAD_RECORDS_EVENT_NAME
    msg_template = ON_BASE_TABLE_LOAD_RECORDS_MSG

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData],
        context: Optional[BaseTableLoadRecordsContext],
    ):
        super().__init__(id, status, data, context)


BASE_TABLE_LOAD_FIELDS_EVENT_NAME = "base_table_load_fields"

ON_BASE_TABLE_LOAD_FIELDS_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start loading base table {table_name}[{table_id}] fields",
        "zh": "开始加载数据表 {table_name}[{table_id}] 字段",
    },
    EventStatus.SUCCESS: {
        "en": "Base table {table_name}[{table_id}] fields loaded",
        "zh": "加载数据表 {table_name}[{table_id}] 字段完成",
    },
    EventStatus.FAILED: {
        "en": "Failed to load base table {table_name}[{table_id}] fields",
        "zh": "加载数据表 {table_name}[{table_id}] 字段失败",
    },
    EventStatus.PROCESSING: {
        "en": "Loading base table {table_name}[{table_id}] fields",
        "zh": "加载数据表 {table_name}[{table_id}] 字段中",
    },
}


class BaseTableLoadFieldsContext(TypedDict):
    """On base table load fields context"""

    table_id: str
    table_name: str


class OnBaseTableLoadFieldsEvent(Event[EventData, BaseTableLoadFieldsContext]):
    """On base table load fields event"""

    name = BASE_TABLE_LOAD_FIELDS_EVENT_NAME

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData],
        context: Optional[BaseTableLoadFieldsContext],
    ):
        super().__init__(id, status, data, context)


LINK_TABLE_INIT_EVENT_NAME = "link_table_init"


class LinkTableInitContext(TypedDict):
    """On link table init context"""

    table_id: str
    name: str
    view_id: Optional[str] = None


ON_LINK_TABLE_INIT_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start initializing linked base table {name}[{table_id}]",
        "zh": "开始初始化关联数据表 {name}[{table_id}]",
    },
    EventStatus.SUCCESS: {
        "en": "Linked Base table {name}[{table_id}] initialized",
        "zh": "关联数据表 {name}[{table_id}] 初始化完成",
    },
    EventStatus.FAILED: {
        "en": "Failed to initialize linked base table {name}[{table_id}]",
        "zh": "关联数据表 {name}[{table_id}] 初始化失败",
    },
}


class OnLinkTableInitEvent(Event[EventData, BaseTableInitContext]):
    """On link table init event"""

    name = LINK_TABLE_INIT_EVENT_NAME
    msg_template = ON_LINK_TABLE_INIT_MSG

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData],
        context: Optional[BaseTableInitContext],
    ):
        super().__init__(id, status, data, context)


LINK_TABLE_LOAD_FIELDS_EVENT_NAME = "link_table_load_fields"


class LinkTableLoadFieldsContext(TypedDict):
    """On link table load fields context"""

    table_id: str
    table_name: str


ON_LINK_TABLE_LOAD_FIELDS_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start loading records of linked base table {name}[{table_id}]",
        "zh": "开始加载关联数据表 {name}[{table_id}] 字段",
    },
    EventStatus.SUCCESS: {
        "en": "Linked base table {name}[{table_id}] fields loaded",
        "zh": "关联数据表 {name}[{table_id}] 字段加载完成",
    },
    EventStatus.FAILED: {
        "en": "Failed to load fields of linked base table {name}[{table}]",
        "zh": "关联数据表 {name}[{table_id}] 字段加载失败",
    },
    EventStatus.PROCESSING: {
        "en": "Loading linked base table {table_name}[{table_id}] fields",
        "zh": "加载关联数据表 {table_name}[{table_id}] 字段中",
    },
}


class OnLinkTableLoadFieldsEvent(Event[EventData, LinkTableLoadFieldsContext]):
    """On link table load fields event"""

    name = LINK_TABLE_LOAD_FIELDS_EVENT_NAME
    msg_template = ON_LINK_TABLE_LOAD_FIELDS_MSG

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData],
        context: Optional[LinkTableLoadFieldsContext],
    ):
        super().__init__(id, status, data, context)


LINK_TABLE_LOAD_RECORDS_EVENT_NAME = "link_table_load_records"

ON_LINK_TABLE_LOAD_RECORDS_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start loading link base table {table_name}[{table_id}] records",
        "zh": "开始加载关联数据表 {table_name}[{table_id}] 记录",
    },
    EventStatus.SUCCESS: {
        "en": "Link table {table_name}[{table_id}] records loaded",
        "zh": "加载关联数据表 {table_name}[{table_id}] 记录完成",
    },
    EventStatus.FAILED: {
        "en": "Failed to load link table {table_name}[{table_id}] records",
        "zh": "加载关联数据表 {table_name}[{table_id}] 记录失败",
    },
    EventStatus.PROCESSING: {
        "en": "Loading link table {table_name}[{table_id}] records",
        "zh": "加载关联数据表 {table_name}[{table_id}] 记录中",
    },
}


class LinkTableLoadRecordsContext(TypedDict):
    """On link table load records context"""

    table_id: str
    table_name: str


class OnLinkTableLoadRecordsEvent(Event[EventData, LinkTableLoadRecordsContext]):
    """On link table load records event"""

    name = LINK_TABLE_LOAD_RECORDS_EVENT_NAME
    msg_template = ON_LINK_TABLE_LOAD_RECORDS_MSG

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData],
        context: Optional[LinkTableLoadRecordsContext],
    ):
        super().__init__(id, status, data, context)


BASE_TABLE_UPLOAD_ATTACHMENTS_EVENT_NAME = "base_table_upload_attachments"

ON_BASE_TABLE_UPLOAD_ATTACHMENTS_MSG: dict[EventStatus, EventMsg] = {
    EventStatus.START: {
        "en": "Start uploading base table {table_name}[{table_id}] attachments",
        "zh": "开始上传数据表 {table_name}[{table_id}] 附件",
    },
    EventStatus.SUCCESS: {
        "en": "Upload base table {table_name}[{table_id}] attachments completed",
        "zh": "上传数据表 {table_name}[{table_id}] 附件完成",
    },
    EventStatus.FAILED: {
        "en": "Failed to upload base table {table_name}[{table_id}] attachments",
        "zh": "上传数据表 {table_name}[{table_id}] 附件失败",
    },
    EventStatus.PROCESSING: {
        "en": "Uploading base table {table_name}[{table_id}] attachments",
        "zh": "上传数据表 {table_name}[{table_id}] 附件中",
    },
}


class BaseTableUploadAttachmentsContext(TypedDict):
    """On base table upload attachments context"""

    table_id: str
    table_name: str


class OnBaseTableUploadAttachmentsEvent(Event[EventData, BaseTableLoadRecordsContext]):
    """On base table upload attachments event"""

    name = BASE_TABLE_UPLOAD_ATTACHMENTS_EVENT_NAME
    msg_template = ON_BASE_TABLE_UPLOAD_ATTACHMENTS_MSG

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[EventData],
        context: Optional[BaseTableUploadAttachmentsContext],
    ):
        super().__init__(id, status, data, context)
