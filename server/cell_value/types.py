from __future__ import annotations
from enum import Enum
from typing import TypedDict, Literal, Optional, Union
from server.types import FieldType, FieldUIType


# class SegmentType(Enum):
#     TEXT = "text"
#     MENTION = "mention"
#     URL = "url"

type TextSegmentType = Literal["text"]
type UrlSegmentType = Literal["url"]
type MentionSegmentType = Literal["mention"]

type SegmentType = Union[
    TextSegmentType,
    UrlSegmentType,
    MentionSegmentType,
]


# class MentionType(Enum):
#     USER = "User"
#     DOCX = "Docx"
#     SHEET = "Sheet"
#     BITABLE = "Bitable"
type DocumentMentionType = Literal["Docx", "Sheet", "Bitable"]

type MentionType = Union[Literal["User"], DocumentMentionType]


class BaseSegment(TypedDict):
    type: SegmentType
    text: str


class TextSegment(BaseSegment):
    type: TextSegmentType


class UrlSegment(BaseSegment):
    type: UrlSegmentType
    link: str


class MentionSegment(BaseSegment):
    type: MentionSegmentType
    mentionType: MentionType
    token: str


class UserMentionSegment(MentionSegment):
    mentionType: Literal["User"]
    name: str
    mentionNotify: bool


class DocumentMentionSegment(MentionSegment):
    mentionType: DocumentMentionType


class BaseUser(TypedDict):
    avatar_url: str
    email: str
    id: str
    name: str
    en_name: str


class FileItemValue(TypedDict):
    size: Optional[int] = None
    name: Optional[str] = None
    type: Literal["url", "file"]
    file_token: Optional[str] = None
    path: str
    """Local path or url of the file"""


class UrlCellValue(TypedDict):
    link: str
    text: str


class AttachmentItem(TypedDict):
    file_token: str
    name: str
    size: int
    type: str
    url: str
    tmp_url: str


class SingleOrDuplexLinkCellValue(TypedDict):
    link_record_ids: list[str]


class FormulaOrLookupCellValue(TypedDict):
    type: FieldType
    ui_type: FieldUIType
    value: list[BasicBaseCellValue]


class locationCellValue(TypedDict):
    location: str
    pname: str
    cityname: str
    adname: str
    address: str
    name: str
    full_address: str


class ChatGroupItem(TypedDict):
    name: str
    avatar_url: str
    id: str


type SegmentItem = Union[
    TextSegment,
    UrlSegment,
    UserMentionSegment,
    DocumentMentionSegment,
]
type SegmentsCellValue = list[SegmentItem]
type NumberCellValue = float | int
type SingleSelectCellValue = str
type MultiSelectCellValue = list[str]
type DatetimeCellValue = int
type CheckboxCellValue = bool
type UserCellValue = list[BaseUser]
type PhoneCellValue = str
type AttachmentCellValue = list[AttachmentItem]
type ChatGroupCellValue = list[ChatGroupItem]
type CreatedTimeCellValue = int
type ModifiedTimeCellValue = int
type CreatedUserCellValue = BaseUser
type ModifiedUserCellValue = BaseUser
type AutoNumberCellValue = str
type BasicBaseCellValue = Union[
    SegmentsCellValue,
    NumberCellValue,
    SingleSelectCellValue,
    DatetimeCellValue,
    CheckboxCellValue,
    BaseUser,
    PhoneCellValue,
    UrlCellValue,
    AttachmentItem,
    SingleOrDuplexLinkCellValue,
    locationCellValue,
    ChatGroupItem,
    SegmentItem,
]
type BaseCellValue = Union[
    SegmentsCellValue,
    NumberCellValue,
    SingleSelectCellValue,
    MultiSelectCellValue,
    DatetimeCellValue,
    CheckboxCellValue,
    UserCellValue,
    PhoneCellValue,
    UrlCellValue,
    AttachmentCellValue,
    SingleOrDuplexLinkCellValue,
    locationCellValue,
    ChatGroupCellValue,
    CreatedTimeCellValue,
    ModifiedTimeCellValue,
    FormulaOrLookupCellValue,
    CreatedUserCellValue,
    ModifiedUserCellValue,
    AutoNumberCellValue,
]
