import os
import shutil
from tempfile import TemporaryDirectory
from server.utils import get_file_type
from server.file import FileManager, FileItem, fileTokenManager
from server.data_parser import dataParser
from server.data_parser.xlsx import ReadXLSXConfig
from server.data_parser.types import PaginationData, ParsedData
from server.data_parser.tests.utils import TestCase

TEST_DIR = os.path.dirname(__file__)
XLSX_FILE_PATH = os.path.join(TEST_DIR, "./assets/data.xlsx")
XLSM_FILE_PATH = os.path.join(TEST_DIR, "./assets/data.xlsm")
XLTM_FILE_PATH = os.path.join(TEST_DIR, "./assets/data.xltm")
XLTX_FILE_PATH = os.path.join(TEST_DIR, "./assets/data.xltx")
DEFAULT_SHEET_NAME = "Sheet1"

TEST_CASES: list[TestCase[ReadXLSXConfig, PaginationData[ParsedData]]] = [
    {
        "description": "Test preview xlsx with whole data",
        "judge": [
            (
                lambda data: len(data["data"]["data"]) == 10000,
                "The length of data is not 10000.",
            ),
            (lambda data: data["page_token"] == 0, "The returned page token is not 0."),
        ],
    },
    {
        "description": "Test preview xlsx with default config",
        "config": {
            "page_size": 200,
            "page_token": None,
        },
        "judge": [
            (
                lambda data: len(data["data"]["data"]) == 200,
                "The length of data is not 200.",
            ),
            (lambda data: data["page_token"] == 0, "The returned page token is not 0."),
        ],
    },
    {
        "description": "Test preview xlsx with page token 1",
        "config": {
            "page_size": 200,
            "page_token": 1,
            "config": {
                "sheet_name": DEFAULT_SHEET_NAME,
                "header": 1,
            },
        },
        "judge": [
            (
                lambda data: len(data["data"]["data"]) == 200,
                "The length of data is not 200.",
            ),
            (lambda data: data["page_token"] == 1, "The returned page token is not 0."),
        ],
    },
    {
        "description": "Test preview xlsx with header 2",
        "config": {
            "page_size": 200,
            "page_token": None,
            "config": {
                "sheet_name": DEFAULT_SHEET_NAME,
                "header": 2,
            },
        },
        "judge": [
            (
                lambda data: len(data["data"]["data"]) == 200,
                "The length of data is not 200.",
            ),
            (lambda data: data["page_token"] == 0, "The returned page token is not 0."),
        ],
    },
    {
        "description": "Test preview xlsx with efficiently data",
        "config": {
            "page_size": 200,
            "page_token": None,
            "config": {
                "sheet_name": "Sheet2",
            },
        },
        "judge": [
            (
                lambda data: data["data"]["data"][0][0] == 1,
                "The first row is wrong.",
            ),
        ],
    },
    {
        "description": "Test preview xlsx with urls",
        "config": {
            "page_size": 200,
            "page_token": None,
            "config": {
                "sheet_name": "Sheet3",
            },
        },
        "judge": [
            (
                lambda data: isinstance(data["data"]["data"][1][8], dict)
                and data["data"]["data"][1][8]["type"] == "url",
                "The I2 cell is not a url.",
            )
        ],
    },
    {
        "description": "Test preview xlsx with images",
        "config": {
            "page_size": 200,
            "page_token": None,
            "config": {
                "sheet_name": "Sheet4",
            },
        },
        "judge": [
            (
                lambda data: isinstance(data["data"]["data"][1][4], list)
                and data["data"]["data"][1][4][0]["type"] == "file",
                "The E1 cell is not a file list.",
            ),
        ],
    },
]


def run_xlsx_test_case(
    file: FileItem, test_case: TestCase[ReadXLSXConfig, PaginationData[list[list]]]
):
    data = dataParser.preview(
        get_file_type(file.file_path), file, test_case.get("config", None)
    )
    for func, msg in test_case["judge"]:
        assert func(data), "".join([test_case["description"], ": ", msg])


def test_xlsx():
    with TemporaryDirectory() as cache_path, open(XLSX_FILE_PATH, "rb") as f:
        fileManager = FileManager(cache_path, fileTokenManager, user_limit=None)
        xlsx_token = fileManager.save_file(
            "tenant_key", "base_id", "user_id", "test.xlsx", f.read()
        )
        xlsx_file_item = fileManager.get_file(xlsx_token)
        for test_case in TEST_CASES:
            run_xlsx_test_case(xlsx_file_item, test_case)
        for row in dataParser.parse(
            get_file_type(xlsx_file_item.file_path), xlsx_file_item
        ):
            assert isinstance(row, dict)


def test_xlsm():
    with TemporaryDirectory(dir="") as cache_path, open(XLSM_FILE_PATH, "rb") as f:
        fileManager = FileManager(cache_path, fileTokenManager, user_limit=None)
        xlsx_token = fileManager.save_file(
            "tenant_key", "base_id", "user_id", "test.xlsm", f.read()
        )
        xlsx_file_item = fileManager.get_file(xlsx_token)
        for test_case in TEST_CASES:
            run_xlsx_test_case(xlsx_file_item, test_case)
        for row in dataParser.parse(
            get_file_type(xlsx_file_item.file_path), xlsx_file_item
        ):
            assert isinstance(row, dict)


def test_xltm():
    with TemporaryDirectory(dir="") as cache_path, open(XLTM_FILE_PATH, "rb") as f:
        fileManager = FileManager(cache_path, fileTokenManager, user_limit=None)
        xlsx_token = fileManager.save_file(
            "tenant_key", "base_id", "user_id", "test.xltm", f.read()
        )
        xlsx_file_item = fileManager.get_file(xlsx_token)
        for test_case in TEST_CASES:
            run_xlsx_test_case(xlsx_file_item, test_case)
        for row in dataParser.parse(
            get_file_type(xlsx_file_item.file_path), xlsx_file_item
        ):
            assert isinstance(row, dict)


def test_xltx():
    with TemporaryDirectory(dir="") as cache_path, open(XLTX_FILE_PATH, "rb") as f:
        fileManager = FileManager(cache_path, fileTokenManager, user_limit=None)
        xlsx_token = fileManager.save_file(
            "tenant_key", "base_id", "user_id", "test.xltx", f.read()
        )
        xlsx_file_item = fileManager.get_file(xlsx_token)
        for test_case in TEST_CASES:
            run_xlsx_test_case(xlsx_file_item, test_case)
        for row in dataParser.parse(
            get_file_type(xlsx_file_item.file_path), xlsx_file_item
        ):
            assert isinstance(row, dict)
