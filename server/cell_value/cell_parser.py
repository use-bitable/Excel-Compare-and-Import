#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Cell parser

from .core import CellTranslator
from .segments import SegmentsCellParserPlugin
from .number import NumberCellParserPlugin
from .phone import PhoneCellParserPlugin
from .datetime import DatetimeParserPlugin
from .multi_select import MultiSelectCellParserPlugin
from .single_select import SingleSelectCellParserPlugin
from .url import UrlCellParserPlugin
from .user import UserCellParserPlugin
from .attachment import AttachmentCellParserPlugin
from .checkbox import CheckboxCellParserPlugin
from .formula_or_lookup import FormulaOrLookupCellParserPlugin
from .single_or_duplex_link import SingleOrDuplexLinkCellParserPlugin

CELL_PARSER = CellTranslator(
    [
        SegmentsCellParserPlugin(),
        NumberCellParserPlugin(),
        PhoneCellParserPlugin(),
        DatetimeParserPlugin(),
        MultiSelectCellParserPlugin(),
        SingleSelectCellParserPlugin(),
        UrlCellParserPlugin(),
        UserCellParserPlugin(),
        AttachmentCellParserPlugin(),
        CheckboxCellParserPlugin(),
        FormulaOrLookupCellParserPlugin(),
        SingleOrDuplexLinkCellParserPlugin(),
    ]
)
