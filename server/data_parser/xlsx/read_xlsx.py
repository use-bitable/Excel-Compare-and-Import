"""Excel parse plugin"""

from io import FileIO
from datetime import datetime
from openpyxl import load_workbook, Workbook
from openpyxl.cell import Cell
from server.file import FileItem
from .config import ReadXLSXConfig
from ..core import DataParser
from ..types import PreviewConfig, CanPaginationData, BasicValueType
from ..exceptions import InvalidConfigValue
from ..utils import preview_cache


def parse_cell(cell: Cell) -> BasicValueType:
    """Parse the cell value"""
    link = cell.hyperlink
    if not link is None:
        return {
            "url": str(link.target),
            "text": str(link.display),
        }
    value = cell.value
    if value is None or isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, datetime):
        return int(round(value.timestamp() * 1000))


def validate_read_config(config: ReadXLSXConfig):
    """Validate the config"""
    sheet_name = config.get("sheet_name")
    if sheet_name is None:
        raise InvalidConfigValue("`sheet_name` is required")
    sheet_name = str(sheet_name)
    data_range = config.get("data_range", None)
    if not data_range is None and not isinstance(data_range, str):
        data_range = str(data_range)
    header_index = config.get("header", None)
    if header_index is None:
        header_index = 1
    return (sheet_name, data_range, header_index)


def close_wb_file(wb: Workbook, f: FileIO):
    """Get the close function for workbook and file"""

    def close():
        """Close the workbook and file"""
        wb.close()
        f.close()

    return close


def get_workbook(
    file: FileItem,
    read_only: bool = False,
):
    """Get the workbook object from the file

    Args:
        file (FileItem): file

    Returns:
        (Workbook, Callable[[], None]): workbook object and close function
    """
    f = open(file.file_path, "rb")
    wb = load_workbook(
        filename=f,
        read_only=read_only,
        keep_vba=True,
        data_only=True,
        rich_text=False,
        keep_links=True,
    )
    return (wb, close_wb_file(wb, f))


def validate_data(data: list[list]):
    """Check if the file can be parsed"""
    header_checker = [not cell is None for cell in data[0]]
    if not all(header_checker):
        pass
    return True


def get_xlsx_iter_data(
    data: FileItem,
    config: ReadXLSXConfig,
):
    sheet_name = config.get("sheet_name")
    if sheet_name is None:
        raise InvalidConfigValue("`sheet_name` is required")
    sheet_name = str(sheet_name)
    data_range = config.get("data_range", None)
    if not data_range is None and not isinstance(data_range, str):
        data_range = str(data_range)
    header_index = config.get("header", None)
    if header_index is None:
        header_index = 1
    if not isinstance(header_index, int):
        header_index = int(header_index)
    wb, close = get_workbook(data)
    ws = wb[sheet_name]
    _min_row = ws.min_row
    _max_row = ws.max_row

    if data_range:
        ws = ws[data_range]
        min_row = max(header_index, 0)
        if header_index >= len(ws):
            raise InvalidConfigValue(f"Header index {header_index} is out of range.")
        _data = ([cell.value for cell in row] for row in ws[min_row:])
    else:
        min_row = max(header_index, _min_row)
        if min_row > _max_row:
            raise InvalidConfigValue(f"Page token is out of range.")
        max_row = min(min_row, _max_row)
        if header_index > max_row:
            raise InvalidConfigValue(f"Header index {header_index} is out of range.")
        _data = (
            [cell.value for cell in row]
            for row in ws.iter_rows(
                min_row=min_row,
                max_row=max_row,
            )
        )
    return (_data, close)


def parse_data(data: FileItem, config: ReadXLSXConfig, context: DataParser):
    sheet_name = config.get("sheet_name")
    if sheet_name is None:
        raise InvalidConfigValue("`sheet_name` is required")
    sheet_name = str(sheet_name)
    data_range = config.get("data_range", None)
    if not data_range is None and not isinstance(data_range, str):
        data_range = str(data_range)
    header_index = config.get("header", None)
    if header_index is None:
        header_index = 1
    if not isinstance(header_index, int):
        header_index = int(header_index)
    wb, close = get_workbook(data)


def get_preview_cache_key(config: PreviewConfig[ReadXLSXConfig]):
    _config = config["config"]
    return f"SN{_config["sheet_name"]}DR{_config.get("data_range", None)}H{_config.get("header", 1)}S{config["page_size"]}T{config.get("page_token", 0)}"


@preview_cache(get_cache_key=get_preview_cache_key)
def preview_xlsx(data: FileItem, config: PreviewConfig[ReadXLSXConfig]):
    """Preview excel file"""
    page_size = config.get("page_size", None)
    if page_size is None:
        raise InvalidConfigValue("`page_size` is required")
    page_size = int(page_size)
    page_token = config.get("page_token", None)
    if page_token is None:
        page_token = 0
    if not isinstance(page_token, int):
        page_token = int(page_token)

    _config = config["config"]
    if _config is None:
        raise InvalidConfigValue("`config` is required")
    sheet_name, data_range, header_index = validate_read_config(_config)

    wb, close = get_workbook(data)
    ws = wb[sheet_name]
    _min_row = ws.min_row
    _max_row = ws.max_row
    _min_col = ws.min_column
    _max_col = ws.max_column

    if data_range:
        ws = ws[data_range]
        min_row = max(header_index + page_token * page_size - 1, 0)
        if min_row > len(ws):
            raise InvalidConfigValue(f"Page token {page_token} is out of range.")
        max_row = min(len(ws), min_row + page_size)
        if header_index > max_row:
            raise InvalidConfigValue(f"Header index {header_index} is out of range.")
        ws = ws[min_row : max_row + 1]
        _data = [[parse_cell(cell) for cell in row] for row in ws]
    else:
        min_row = max(header_index + page_token * page_size, _min_row)
        if min_row > _max_row:
            raise InvalidConfigValue(f"Page token {page_token} is out of range.")
        max_row = min(min_row + page_size - 1, _max_row)
        if header_index > max_row:
            raise InvalidConfigValue(f"Header index {header_index} is out of range.")
        _data = [
            [parse_cell(cell) for cell in row]
            for row in ws.iter_rows(
                min_row=min_row,
                max_row=max_row,
                min_col=_min_col,
                max_col=_max_col,
            )
        ]
    close()
    res: CanPaginationData[list[list]] = {
        "data": _data,
        "page_size": page_size,
        "page_token": page_token,
    }
    return res
