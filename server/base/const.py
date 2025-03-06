#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Constants

from typing import Literal
from .field_type import FieldType

# Limits
USER_NUM_IN_CELL_LIMIT = 1000
OPTIONS_IN_CELL_LIMIT = 1000
PHONE_LENGTH_LIMIT = 64
TEXT_CHAR_NUM_LIMIT = 100000
MAX_GET_RECORDS_ONCE_LIMIT = 500
MAX_CREATE_RECORDS_ONCE_LIMIT = 500
MAX_DELETE_RECORDS_ONCE_LIMIT = 500
MAX_UPDATE_RECORDS_ONCE_LIMIT = 500
BASE_FILE_SIZE_LIMIT = 20 * 1024 * 1024


DEFAULT_SEPARATOR = ","
BASE_PRODUCT = Literal["FEISHU", "LARK"]
BASE_REQUEST_SUCCESS_CODE = 0
DEFAULT_BOOL_VALUE = {
    "true": ["是", "True", "true", "TRUE", "1", "☑️"],
    "false": ["否", "False", "false", "FALSE", "0", ""],
}
AUTO_FIELD_TYPES = [
    FieldType.CreatedTime,
    FieldType.AutoNumber,
    FieldType.CreatedUser,
    FieldType.Formula,
    FieldType.ModifiedTime,
    FieldType.ModifiedUser,
    FieldType.Lookup,
]
