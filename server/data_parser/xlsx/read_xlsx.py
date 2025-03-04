"""Excel parse plugin"""
from io import FileIO
from openpyxl import load_workbook
from .config import ReadXLSXConfig
from ..core import DataParser
from ..types import PreviewConfig, CanPagnationData
from ..exceptions import InvalidConfigValue

def parse_data(
    data: FileIO,
    config: ReadXLSXConfig,
    context: DataParser
):
    pass


def preview_xlsx(
    data: FileIO,
    config: PreviewConfig[ReadXLSXConfig]
):
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
    
    
    wb = load_workbook(
        filename=data,
        read_only=True,
        keep_vba=True,
        data_only=True,
        rich_text=False,
        keep_links=False,
    )
    ws = wb[sheet_name]
    _min_row = ws.min_row
    _max_row = ws.max_row
    
    if data_range:
        ws = ws[data_range]
        min_row = max(header_index + page_token * page_size - 1, 0)
        if min_row > len(ws):
            raise InvalidConfigValue(f"Page token {page_token} is out of range.")
        max_row = min(len(ws), min_row + page_size + 1)
        if header_index > max_row:
            raise InvalidConfigValue(f"Header index {header_index} is out of range.")
        ws = ws[min_row: max_row + 1]
        data = [
            [cell.value for cell in row] for row in ws
        ]
    else:
        min_row = max(header_index + page_token * page_size, _min_row)
        if min_row > _max_row:
            raise InvalidConfigValue(f"Page token {page_token} is out of range.")
        max_row = min(min_row + page_size - 1, _max_row)
        if header_index > max_row:
            raise InvalidConfigValue(f"Header index {header_index} is out of range.")
        data: list[list] = [
            [cell.value for cell in row] for row in ws.iter_rows(
                min_row=min_row,
                max_row=max_row,
            )
        ]
    wb.close()
    res: CanPagnationData[list[list]] = {
        "data": data,
        "page_size": page_size,
        "page_token": page_token,
    }
    return res