#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from typing import Mapping

Number = int | float
RawValueType = Number | str | bool | None | list[str]
HeadersMapping = Mapping[str, str | bytes | None]
