import server.base
from typing import Set
from server.types import FieldType
from .core import BasicCellParserPlugin
from .types import (
    SingleOrDuplexLinkCellValue,
    SingleOrDuplexLinkWriteValue,
    SingleOrDuplexLinkParsedValue,
)

DEFAULT_SEPARATOR = ","
MAX_LINKS_IN_CELL = 500


class SingleOrDuplexLinkCellParserPlugin(
    BasicCellParserPlugin[
        SingleOrDuplexLinkCellValue | list[SingleOrDuplexLinkCellValue],
        SingleOrDuplexLinkParsedValue,
        SingleOrDuplexLinkWriteValue,
    ]
):
    """Single or duplex link cell value translator"""

    field_type = [FieldType.SingleLink, FieldType.DuplexLink]
    indexable = False

    def parse_base_value(
        self,
        value,
        context,
        field=None,
    ):
        """Parse base cell value"""
        v = (value[0] if value else None) if isinstance(value, list) else value
        if isinstance(v, dict):
            ids = v.get("link_record_ids")
            ids.sort()
            return set(ids)[:MAX_LINKS_IN_CELL]
        return None

    def parse_data_value(self, value, context, field):
        """Parse base cell value"""
        table: server.base.table.IBaseTable = field.get_table()
        link_field_id = (
            field.link_config.get("primary_key") if field.link_config else None
        )
        if not link_field_id:
            return None
        link_table = table.get_link_table(field.property.table_id)
        if not link_table:
            return None
        link_field = link_table.get_field(link_field_id)
        if not link_field:
            return None
        parsed_value = context.parse_data_value(link_field, value)
        link_records = link_table.search_index((parsed_value))
        if not link_records:
            # if not link_field.link_config.get("allow_add"):
            #     return None
            return None

        return {
            i.id
            for i in link_records[:MAX_LINKS_IN_CELL]
            if isinstance(i, server.base.record.IBaseRecord) and i.id
        }

    def to_write_value(self, value, context, field):
        """Convert to write value"""
        if isinstance(value, set):
            return list(value)
        return value
