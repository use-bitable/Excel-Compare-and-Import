import os
from time import time
import shutil
from openpyxl import load_workbook
from server.file import fileManager
from server.data_parser.xlsx.read_xlsx import load_images, thread_load_images

TEST_DIR = os.path.dirname(__file__)
XLSX_FILE_PATH = os.path.join(TEST_DIR, "./assets/data.xlsx")
DEFAULT_SHEET_NAME = "Sheet4"


def test_load_images():
    with open(XLSX_FILE_PATH, "rb") as f:
        token = fileManager.save_file(
            "tenant_key", "base_id", "user_id", "test.xlsx", f.read()
        )
        file_item = fileManager.get_file(token)
        wb = load_workbook(f)
        ws = wb[DEFAULT_SHEET_NAME]
        start = time()
        images = load_images(ws, file_item)
        load_images_time = time() - start
        shutil.rmtree(os.path.join(file_item.dir_path, "attachments"))
        shutil.rmtree(os.path.join(file_item.dir_path, "cache"))
        start = time()
        images = thread_load_images(ws, file_item)
        thread_load_images_time = time() - start
        assert (
            load_images_time > thread_load_images_time
        ), f"load_images_time: {load_images_time}s, thread_load_images_time: {thread_load_images_time}s"
