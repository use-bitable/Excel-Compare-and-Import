#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from typing import Literal, Optional, TypedDict, Required, NotRequired
from enum import Enum

class UserIdType(Enum):
    union_id = "union_id"
    open_id = "open_id"
    user_id = "user_id"

class LinkValueType(TypedDict):
    """Link value type"""
    text: Required[str]
    link: Required[str]

type SegmentType = Literal["text", "mention", "url"]

class SegmentValueType(TypedDict):
    """Segments value type"""
    type: Required[SegmentType]
    text: Required[str]
    mentionType: NotRequired[Optional[str]]
    token: NotRequired[Optional[str]]
    link: NotRequired[Optional[str]]
    name: NotRequired[Optional[str]]

SegmentsValueType = list[SegmentValueType] | str

class AttachmentValueType(TypedDict):
    """Attachment value type"""
    file_token: Required[str]
    name: NotRequired[Optional[str]]
    size: NotRequired[Optional[int]]
    type: NotRequired[Optional[str]]
    url: NotRequired[Optional[str]]
    tmp_url: NotRequired[Optional[str]]

class UrlValueType(TypedDict):
    """Url value type"""
    text: Required[str]
    link: Required[str]

class UserValueType(TypedDict):
    """User value type"""
    id: Required[str]
    name: NotRequired[Optional[str]]
    en_name: NotRequired[Optional[str]]
    email: NotRequired[Optional[str]]

class LinkValueType(TypedDict):
    """Link value type"""
    link_record_ids: Required[list[str]]