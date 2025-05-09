#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from typing import Mapping

type Number = int | float
type RawValueType = Number | str | bool | None | list[str]
type HeadersMapping = Mapping[str, str | bytes | None]
