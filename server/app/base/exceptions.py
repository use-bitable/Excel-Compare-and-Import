#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Cell value module exception


class FieldConversionException(Exception):
    def __init__(self, field_id, field_name, ui_type, value, message: str):
        self.field_id = field_id
        self.field_name = field_name
        self.ui_type = ui_type
        self.value = value
        self.message = message

    def __str__(self):
        return f"FieldConversionError ({self.value} => {self.field_name}[{self.ui_type} Field]): {self.message}"


class InvalidFileException(Exception):
    def __init__(self, message: str):
        self.message = message

    def __str__(self):
        return f"InvalidFileException: {self.message}"


class VerifyPersonalBaseTokenException(Exception):
    """Verify Personal Base Token Exception"""


class BaseClientInitException(Exception):
    """Base Client Init Exception"""


class UploadMediaException(Exception):
    """Upload Media Exception"""


class ListTableException(Exception):
    """List Table Exception"""


class GetTableException(Exception):
    """Get Table Exception"""


class ListFieldsException(Exception):
    """List Fields Exception"""


class ListRecordsException(Exception):
    """List Records Exception"""
