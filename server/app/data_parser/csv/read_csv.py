import csv
from openpyxl.utils import get_column_letter
from app.file import FileItem
from .types import ReadCSVConfig
from .constants import DEFAULT_ENCODING, DEFAULT_READ_MODE
from ..utils import data_cache, parse_data_to_dict
from ..exceptions import InvalidConfigValue, InvalidHeader
from ..types import PaginationConfig, BasicValueType, CanPaginationData, ParsedData
from ..xlsx import (
    get_paginate_cache_key,
    DEFAULT_PAGINATE_CONFIG,
    DEFAULT_PAGE_TOKEN,
    validate_read_config,
)


def get_total_num(file: FileItem, header_index: int):
    with open(file.file_path, mode=DEFAULT_READ_MODE, encoding=DEFAULT_ENCODING) as f:
        reader = csv.reader(f)
        total = 0
        for i, _ in enumerate(reader):
            if i < header_index:
                continue
            total += 1
    return total


def validate_header(header: list[str]):
    header_checker = [not h == "" for h in header]
    if not all(header_checker):
        raise InvalidHeader(
            f"Invalid header: {[get_column_letter(index + 1) for index, v in enumerate(header_checker) if not v]}"
        )
    return True


def iter_row_csv(file: FileItem, config: ReadCSVConfig):
    _config = config.get("config")
    _, data_range, header_index, _ = validate_read_config(_config)
    _min_row = data_range[1] - 1 if not data_range[1] is None else 0
    _min_col = data_range[0] - 1 if not data_range[0] is None else 0
    _max_row = data_range[3] - 1 if not data_range[3] is None else None
    _max_col = data_range[2] - 1 if not data_range[2] is None else None
    header_index = header_index - 1 + _min_row
    f = open(file.file_path, mode=DEFAULT_READ_MODE, encoding=DEFAULT_ENCODING)
    f.seek(header_index)
    reader = csv.reader(f)
    header = []
    for i, row in enumerate(reader):
        if i == header_index:
            header = (
                row[_min_col : _max_col + 1] if not _max_col is None else row[_min_col:]
            )
        if i < header_index:
            continue
        if not _max_row is None and i > _max_row:
            break
        yield parse_data_to_dict(
            [row[_min_col : _max_col + 1] if not _max_col is None else row[_min_col:]],
            header,
        )
    f.close()


@data_cache(get_paginate_cache_key)
def paginate_load_csv(
    data: FileItem,
    config: PaginationConfig[ReadCSVConfig] | None,
    parse_data: bool = False,
):
    if config is None:
        config = DEFAULT_PAGINATE_CONFIG
    page_size = config.get("page_size")
    if not page_size is None:
        page_size = int(page_size)
    page_token = config.get("page_token")
    if page_token is None:
        page_token = DEFAULT_PAGE_TOKEN
    if page_token < 0:
        raise InvalidConfigValue("`page_token` should >= 0")

    _config = config.get("config")
    _, data_range, header_index, _ = validate_read_config(_config)
    _min_row = data_range[1] - 1 if not data_range[1] is None else 0
    _min_col = data_range[0] - 1 if not data_range[0] is None else 0
    _max_row = data_range[3] - 1 if not data_range[3] is None else None
    _max_col = data_range[2] - 1 if not data_range[2] is None else None
    min_row = (
        header_index
        + _min_row
        - 1
        + (page_token * page_size if not page_size is None else 0)
        + (1 if page_token == 0 else 0)
    )
    header_index = header_index - 1 + _min_row
    f = open(data.file_path, mode=DEFAULT_READ_MODE, encoding=DEFAULT_ENCODING)
    f.seek(header_index)
    reader = csv.reader(f)
    header = []
    _data: list[list[BasicValueType]] = []
    has_more = True
    for i, row in enumerate(reader):
        if i == header_index:
            header = (
                row[_min_col : _max_col + 1] if not _max_col is None else row[_min_col:]
            )
        if i < min_row:
            continue
        if not _max_row is None and i > _max_row:
            break
        _data.append(
            row[_min_col : _max_col + 1] if not _max_col is None else row[_min_col:]
        )
        if not page_size is None and len(_data) >= page_size:
            break
    f.close()
    errors = []
    can_parse = True
    try:
        validate_header(header)
    except Exception as e:
        can_parse = False
        errors.append(str(e))
    parsed_data = parse_data_to_dict(_data, header)
    res_data = (
        _data if not parse_data or not can_parse or parsed_data is None else parsed_data
    )
    total = get_total_num(data, header_index)
    res: CanPaginationData[ParsedData] = {
        "data": {
            "data": res_data,
            "meta": {
                "fields": header,
                "total": total,
                "errors": errors,
                "can_parse": can_parse,
                "extra": {
                    "data_range": {
                        "min_row": _min_row + 1,
                        "max_row": _max_row + 1,
                        "min_col": _min_col + 1,
                        "max_col": _max_col + 1,
                    },
                    "header_index": header_index,
                },
            },
        },
        "page_size": len(res_data),
        "page_token": page_token,
        "has_more": has_more,
    }
    return res
