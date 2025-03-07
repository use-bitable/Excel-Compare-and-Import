import os
from openpyxl import load_workbook
from openpyxl.utils import get_column_letter


TEST_DIR = os.path.dirname(__file__)
XLSX_FILE_PATH = os.path.join(TEST_DIR, "./assets/test.xlsx")
DEFAULT_SHEET_NAME = "Sheet1"
with open(XLSX_FILE_PATH, "rb") as f:
    wb = load_workbook(f)
    ws = wb[DEFAULT_SHEET_NAME]
    data = [
        [ f"{get_column_letter(cell.column)}{cell.row}" or cell.value for cell in row] for row in ws.iter_rows()
    ]
    for im in ws._images:
        print(dir(im))
        print(f"{im.anchor._from.col}-{im.anchor._from.row}")
        print(dir(im.ref))
        print(im.path)
    print(data)