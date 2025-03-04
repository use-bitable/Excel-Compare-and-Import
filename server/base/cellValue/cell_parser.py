#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Cell parser

from .core import CellTranslator
from .number import NUMBER_TRANSLATOR
from .segments import SEGMENTS_TRANSLATOR
from .multi_select import MULTISELECT_TRANSLATOR
from .single_select import SINGLE_SELECT_TRANSLATOR
from .datetime import DATETIME_TRANSLATOR
from .attachment.attachment import ATTACHMENT_TRANSLATOR
from .phone import PHONE_TRANSLATOR
from .checkbox.checkbox import CHECKBOX_TRANSLATOR

CELL_PARSER = CellTranslator(
    translators=[
        NUMBER_TRANSLATOR,
        SEGMENTS_TRANSLATOR,
        MULTISELECT_TRANSLATOR,
        SINGLE_SELECT_TRANSLATOR,
        DATETIME_TRANSLATOR,
        ATTACHMENT_TRANSLATOR,
        PHONE_TRANSLATOR,
        CHECKBOX_TRANSLATOR
    ]
)
