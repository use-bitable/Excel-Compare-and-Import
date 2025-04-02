from typing import Callable
from xlrd import open_workbook, Book, xldate_as_datetime
from xlrd.sheet import Sheet
from server.file import FileItem
from server.utils import datetime_to_timestamp_ms
from .types import ReadXLSConfig
from ..xlsx import (
    get_paginate_cache_key,
    DEFAULT_PAGINATE_CONFIG,
    DEFAULT_PAGE_TOKEN,
    validate_read_config,
    validate_header,
)
from ..types import CanPaginationData, ParsedData, PaginationConfig, BasicValueType
from ..exceptions import InvalidConfigValue
from ..utils import data_cache, parse_data_to_dict


def get_workbook(
    file: FileItem,
) -> tuple[Book, Callable[[], None]]:
    """Get the workbook object from the file

    Args:
        file (FileItem): file

    Returns:
        (Workbook, Callable[[], None]): workbook object and close function
    """
    wb: Book = open_workbook(
        filename=file.file_path,
        use_mmap=True,
        on_demand=True,
    )

    return wb, wb.release_resources


def _parse_cell(
    ws: Sheet,
    rowx: int,
    colx: int,
) -> BasicValueType:
    hyperlink = ws.hyperlink_map.get((rowx, colx))
    value = ws.cell_value(rowx, colx)
    if not hyperlink is None:
        link = hyperlink.url_or_path
        return {
            "type": "url",
            "value": str(value),
            "link": str(link),
        }
    cell_type = ws.cell_type(rowx, colx)
    match cell_type:
        case 1:
            return str(value)
        case 2:
            return value
        case 3:
            return datetime_to_timestamp_ms(xldate_as_datetime(value, 0))
        case 4:
            return not not value
        case _:
            return None


def get_default_data_range(
    ws: Sheet,
):
    max_row = ws.nrows - 1
    min_row = 0
    min_col = 0
    max_col = ws.ncols - 1
    # find the first and last row that has data use one loop
    for i in range(max_row + 1):
        if any([c != 0 for c in ws.row_types(i)]):
            min_row = i
            break
    for i in range(max_col + 1):
        if any([c != 0 for c in ws.col_types(i)]):
            min_col = i
            break
    return (min_col, min_row, max_col, max_row)


def iter_row_xls(
    file: FileItem,
    config: ReadXLSConfig | None = None,
):
    """Get the row iterator"""
    sheet_name, data_range, header_index, _ = validate_read_config(config)

    wb, close = get_workbook(file)
    if sheet_name is None:
        sheet_name = wb.sheet_names()[0]
    ws = wb.sheet_by_name(sheet_name)
    _min_col, _min_row, _max_col, _max_row = get_default_data_range(ws)
    _min_row = max(data_range[1] - 1 if not data_range[1] is None else 0, _min_row)
    _min_col = max(data_range[0] - 1 if not data_range[0] is None else 0, _min_col)
    _max_row = min(
        data_range[3] - 1 if not data_range[3] is None else _max_row, _max_row
    )
    _max_col = min(
        data_range[2] - 1 if not data_range[2] is None else _max_col, _max_col
    )

    header = ws.row_values(
        header_index + _min_row - 1, start_colx=_min_col, end_colx=_max_col
    )
    validate_header(header)
    header = [str(cell) for cell in header]
    for rowx in range(_min_row + header_index - 1, _max_row + 1):
        yield dict(
            zip(
                header,
                [_parse_cell(ws, rowx, colx) for colx in range(_min_col, _max_col + 1)],
            )
        )
    close()


@data_cache(get_cache_key=get_paginate_cache_key)
def paginate_load_xls(
    data: FileItem,
    config: PaginationConfig[ReadXLSConfig] | None,
    parse_data: bool = False,
) -> CanPaginationData[ParsedData]:
    """Preview excel file"""
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
    sheet_name, data_range, header_index, _ = validate_read_config(_config)

    wb, close = get_workbook(data)
    sheet_names = wb.sheet_names()
    if sheet_name is None:
        sheet_name = sheet_names[0]
    ws = wb.sheet_by_name(sheet_name)
    _min_col, _min_row, _max_col, _max_row = get_default_data_range(ws)
    _min_row = max(data_range[1] - 1 if not data_range[1] is None else 0, _min_row)
    _min_col = max(data_range[0] - 1 if not data_range[0] is None else 0, _min_col)
    _max_row = min(
        data_range[3] - 1 if not data_range[3] is None else _max_row, _max_row
    )
    _max_col = min(
        data_range[2] - 1 if not data_range[2] is None else _max_col, _max_col
    )
    has_more = True
    min_row = (
        header_index
        + _min_row
        - 1
        + (page_token * page_size if not page_size is None else 0)
        + (1 if page_token == 0 else 0)
    )
    max_row = _max_row if page_size is None else min(_max_row, min_row + page_size - 1)
    if min_row > max_row:
        close()
        raise InvalidConfigValue(f"Page token is out of range.")
    has_more = max_row < _max_row
    header = [
        _parse_cell(ws, header_index + _min_row - 1, colx)
        for colx in range(_min_col, _max_col + 1)
    ]
    _data = [
        [_parse_cell(ws, rowx, colx) for colx in range(_min_col, _max_col + 1)]
        for rowx in range(min_row, max_row + 1)
    ]

    close()
    errors = []
    can_parse = True
    try:
        validate_header(header)
        header = [str(cell) for cell in header]
    except Exception as e:
        can_parse = False
        errors.append(str(e))

    parsed_data = (
        parse_data_to_dict(_data, header) if parse_data and can_parse else None
    )
    total = _max_row - _min_row + 1
    if total <= 1:
        can_parse = False
        errors.append(
            "No data, need at least 2 rows of excel file (one for header, one for data)."
        )
    res_data = (
        _data if not parse_data or not can_parse or parsed_data is None else parsed_data
    )
    res: CanPaginationData[ParsedData] = {
        "data": {
            "data": res_data,
            "meta": {
                "fields": header,
                "total": total,
                "errors": errors,
                "can_parse": can_parse,
                "extra": {
                    "sheet_name": sheet_name,
                    "sheet_names": sheet_names,
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
