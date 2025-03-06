#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Progress

from typing import Callable, TypedDict, NotRequired


class Progress(TypedDict):
    """Progress"""

    total: NotRequired[int]
    loaded: NotRequired[int]
    message: str


type OnProgressFunc = Callable[[Progress], None]
