import os
from functools import lru_cache
from app.file import fileManager
from app.types import FieldType
from .core import BasicCellParserPlugin
from .types import (
    AttachmentCellValue,
    FileItemValue,
    AttachmentWriteValue,
    AttachmentWriteItem,
    AttachmentParsedValue,
)

DEFAULT_SEPARATOR = ","
ATTACHMENTS_NUM_LIMIT_IN_CELL = 100


@lru_cache(maxsize=128)
def get_attachment_file_path(token: str, name: str) -> str:
    """Get the cache file path for the given file token"""
    file_item = fileManager.get_file_from_token(token)
    return os.path.join(
        file_item.dir_path,
        "attachments",
        name,
    )


def create_attachment_item(
    attachments: dict[str, FileItemValue],
    attachment_item: FileItemValue,
):
    attachments[attachment_item.get("path")] = attachment_item
    return attachment_item


class AttachmentCellParserPlugin(
    BasicCellParserPlugin[
        AttachmentCellValue, AttachmentParsedValue, AttachmentWriteValue
    ]
):
    """Attachment cell value translator"""

    field_type = [FieldType.Attachment]
    indexable = False

    def parse_base_value(
        self,
        value,
        context,
        field=None,
    ):
        """Parse base cell value"""
        if value is None:
            return None
        return [
            FileItemValue(
                size=i.get("size"),
                name=i.get("name"),
                file_token=i.get("file_token"),
                path=i.get("url"),
                type="url",
            )
            for i in value
            if isinstance(i, dict)
        ]

    def parse_data_value(self, value, context, field):
        """Parse base cell value"""
        table = field.get_table()
        attachments: dict[str, FileItemValue] = table._attachments
        if isinstance(value, str):
            separator = field.config.get("separator") or DEFAULT_SEPARATOR
            return [
                (
                    attachments.get(u)
                    if u in attachments
                    else create_attachment_item(
                        attachments, FileItemValue(type="url", path=u)
                    )
                )
                for u in value.split(separator)[:ATTACHMENTS_NUM_LIMIT_IN_CELL]
                if u
            ]
        if isinstance(value, dict):
            url = value.get("url")
            if url is None:
                return None
            return [
                (
                    attachments.get(url)
                    if url in attachments
                    else create_attachment_item(
                        attachments, FileItemValue(type="url", path=url)
                    )
                )
            ]
        if isinstance(value, list):
            return [
                (
                    attachments.get(
                        get_attachment_file_path(i.get("file_token"), i.get("name"))
                    )
                    if get_attachment_file_path(i.get("file_token"), i.get("name"))
                    in attachments
                    else create_attachment_item(
                        attachments,
                        FileItemValue(
                            size=i.get("size"),
                            name=i.get("name"),
                            path=get_attachment_file_path(
                                i.get("file_token"), i.get("name")
                            ),
                            type="file",
                        ),
                    )
                )
                for i in value[:ATTACHMENTS_NUM_LIMIT_IN_CELL]
                if isinstance(i, dict)
            ]
        return None

    def to_write_value(self, value, context, field):
        if value:
            return [
                AttachmentWriteItem(file_token=i.get("file_token"))
                for i in value
                if isinstance(i, dict) and i.get("file_token")
            ]
        return None
