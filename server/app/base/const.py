from app.types import FieldType
from .types import BaseProduct

# Limits
USER_NUM_IN_CELL_LIMIT = 1000
OPTIONS_IN_CELL_LIMIT = 1000
PHONE_LENGTH_LIMIT = 64
TEXT_CHAR_NUM_LIMIT = 100000
MAX_LIST_TABLE_LIMIT = 100
MAX_LIST_FIELDS_LIMIT = 100
MAX_GET_RECORDS_ONCE_LIMIT = 500
MAX_CREATE_RECORDS_ONCE_LIMIT = 500
MAX_DELETE_RECORDS_ONCE_LIMIT = 500
MAX_UPDATE_RECORDS_ONCE_LIMIT = 500
BASE_FILE_SIZE_LIMIT = 20 * 1024 * 1024

BASE_PRODUCT: list[BaseProduct] = ["FEISHU", "LARK"]
AUTO_FIELD_TYPES = {
    FieldType.CreatedTime,
    FieldType.AutoNumber,
    FieldType.CreatedUser,
    FieldType.Formula,
    FieldType.ModifiedTime,
    FieldType.ModifiedUser,
    FieldType.Lookup,
}
LINK_FIELD_TYPES = {FieldType.SingleLink, FieldType.DuplexLink}
