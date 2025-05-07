from __future__ import annotations
from typing import TypedDict, Literal, Optional, Union, Set
from server.types import FieldType, FieldUIType


# Base Cell Value

type TextSegmentType = Literal["text"]
type UrlSegmentType = Literal["url"]
type MentionSegmentType = Literal["mention"]
type SegmentType = Union[
    TextSegmentType,
    UrlSegmentType,
    MentionSegmentType,
]
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
type NumberCellValue = Union[int, float]
type SingleSelectCellValue = str
type MultiSelectCellValue = list[str]
type DatetimeCellValue = int
type CheckboxCellValue = bool
type UserCellValue = list[BaseUser]
type PhoneCellValue = str
type AttachmentCellValue = list[AttachmentItem]
type ChatGroupCellValue = list[ChatGroupItem]
type CreatedOrModifiedTimeCellValue = int
type CreatedOrModifiedUserCellValue = BaseUser
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
    CreatedOrModifiedTimeCellValue,
    FormulaOrLookupCellValue,
    CreatedOrModifiedUserCellValue,
    AutoNumberCellValue,
]

# Cell parsed value

type SegmentsParsedValue = str
type NumberParsedValue = Union[int, float]
type SingleSelectParsedValue = str
type MultiSelectParsedValue = Set[str]
type DatetimeParsedValue = int
type CheckboxParsedValue = bool
type UserParsedValue = Set[str]
type PhoneParsedValue = str
type AttachmentParsedValue = list[FileItemValue]
type ChatGroupParsedValue = Set[str]
type CreatedOrModifiedTimeParsedValue = int
type CreatedOrModifiedUserParsedValue = str
type AutoNumberParsedValue = str
type FormulaOrLookupParsedValue = str
type SingleOrDuplexLinkParsedValue = Set[str]
type UrlParsedValue = UrlCellValue
type ParsedValue = Union[
    SegmentsParsedValue,
    NumberParsedValue,
    SingleSelectParsedValue,
    MultiSelectParsedValue,
    DatetimeParsedValue,
    CheckboxParsedValue,
    UserParsedValue,
    PhoneParsedValue,
    AttachmentParsedValue,
    SingleOrDuplexLinkCellValue,
    locationCellValue,
    ChatGroupParsedValue,
    CreatedOrModifiedTimeParsedValue,
    CreatedOrModifiedUserParsedValue,
    AutoNumberParsedValue,
    FormulaOrLookupParsedValue,
]

# Base write Value


class HasIdWriteItem(TypedDict):
    id: str


class AttachmentWriteItem(TypedDict):
    file_token: str


type SegmentsWriteValue = str
type NumberWriteValue = Union[int, float]
type SingleSelectWriteValue = str
type MultiSelectWriteValue = list[str]
type DatetimeWriteValue = int
type CheckboxWriteValue = bool
type UserWriteValue = list[HasIdWriteItem]
type PhoneWriteValue = str
type UrlWriteValue = UrlCellValue
type AttachmentWriteValue = list[AttachmentWriteItem]
type SingleOrDuplexLinkWriteValue = list[str]
type LocationWriteValue = str
type ChatGroupWriteValue = list[HasIdWriteItem]
"""The latitude and longitude coordinates, for example: "116.397755,39.903179" """
type CellWriteValue = Union[
    SegmentsWriteValue,
    NumberWriteValue,
    SingleSelectWriteValue,
    MultiSelectWriteValue,
    DatetimeWriteValue,
    CheckboxWriteValue,
    UserWriteValue,
    PhoneWriteValue,
    UrlWriteValue,
    AttachmentWriteValue,
    SingleOrDuplexLinkWriteValue,
    LocationWriteValue,
    ChatGroupWriteValue,
]
