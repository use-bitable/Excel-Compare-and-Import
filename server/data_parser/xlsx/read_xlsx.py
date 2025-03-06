"""Excel parse plugin"""

from io import FileIO
from openpyxl import load_workbook, Workbook
from server.file import FileItem
from .config import ReadXLSXConfig
from ..core import DataParser
from ..types import PreviewConfig, CanPaginationData
from ..exceptions import InvalidConfigValue


def close_wb_file(wb: Workbook, f: FileIO):
    """Get the close function for workbook and file"""

    def close():
        """Close the workbook and file"""
        wb.close()
        f.close()

    return close


def get_workbook(
    file: FileItem,
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
        read_only=True,
        keep_vba=True,
        data_only=True,
        rich_text=False,
        keep_links=False,
    )
    return (wb, close_wb_file(wb, f))


def can_parse(
    data: FileItem,
    config: ReadXLSXConfig,
):
    """Check if the file can be parsed"""
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
    sheet_name = _config.get("sheet_name", None)
    if sheet_name is None:
        raise InvalidConfigValue("`sheet_name` is required")
    sheet_name = str(sheet_name)

    data_range = _config.get("data_range", None)
    if not data_range is None and not isinstance(data_range, str):
        data_range = str(data_range)
    header_index = _config.get("header", None)
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
        min_row = max(header_index + page_token * page_size - 1, 0)
        if min_row > len(ws):
            raise InvalidConfigValue(f"Page token {page_token} is out of range.")
        max_row = min(len(ws), min_row + page_size)
        if header_index > max_row:
            raise InvalidConfigValue(f"Header index {header_index} is out of range.")
        ws = ws[min_row : max_row + 1]
        _data = [[cell.value for cell in row] for row in ws]
    else:
        min_row = max(header_index + page_token * page_size, _min_row)
        if min_row > _max_row:
            raise InvalidConfigValue(f"Page token {page_token} is out of range.")
        max_row = min(min_row + page_size - 1, _max_row)
        if header_index > max_row:
            raise InvalidConfigValue(f"Header index {header_index} is out of range.")
        _data = [
            [cell.value for cell in row]
            for row in ws.iter_rows(
                min_row=min_row,
                max_row=max_row,
            )
        ]
    close()
    res: CanPaginationData[list[list]] = {
        "data": _data,
        "page_size": page_size,
        "page_token": page_token,
    }
    return res
