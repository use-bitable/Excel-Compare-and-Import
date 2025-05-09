import os
import shutil
from app.utils import get_file_type
from app.file import FileManager, FileItem, fileTokenManager
from app.file.constants import BASE_DIR
from app.data_parser import dataParser
from app.data_parser.xls import ReadXLSConfig
from app.data_parser.types import PaginationData, ParsedData
from app.data_parser.tests.utils import TestCase

cache_path = os.path.join(BASE_DIR, "xls_file_cache")
fileManager = FileManager(cache_path, fileTokenManager, user_limit=None)

TEST_DIR = os.path.dirname(__file__)
XLS_FILE_PATH = os.path.join(TEST_DIR, "./assets/data.xls")
DEFAULT_SHEET_NAME = "Sheet1"


TEST_CASES: list[TestCase[ReadXLSConfig, PaginationData[ParsedData]]] = [
    {
        "description": "Test preview xls with whole data",
        "judge": [
            (
                lambda data: len(data["data"]["data"]) == 10000,
                "The length of data is not 10001.",
            ),
            (lambda data: data["page_token"] == 0, "The returned page token is not 0."),
        ],
    },
    {
        "description": "Test preview xls with default config",
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
        "description": "Test preview xls with page token 1",
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
        "description": "Test preview xls with header 2",
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
        "description": "Test preview xls with efficiently data",
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
        "description": "Test preview xls with urls",
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
]


def run_xls_test_case(
    file: FileItem, test_case: TestCase[ReadXLSConfig, PaginationData[list[list]]]
):
    data = dataParser.preview(
        get_file_type(file.file_path), file, test_case.get("config", None)
    )
    for func, msg in test_case["judge"]:
        assert func(data), "".join([test_case["description"], ": ", msg])


def test_preview():
    with open(XLS_FILE_PATH, "rb") as f:
        xls_token = fileManager.save_file(
            "tenant_key", "base_id", "user_id", "test.xls", f.read()
        )
        xls_file_item = fileManager.get_file_from_token(xls_token)
    for test_case in TEST_CASES:
        run_xls_test_case(xls_file_item, test_case)
    for row in dataParser.parse(get_file_type(xls_file_item.file_path), xls_file_item):
        assert isinstance(row, dict)
    shutil.rmtree(cache_path)
