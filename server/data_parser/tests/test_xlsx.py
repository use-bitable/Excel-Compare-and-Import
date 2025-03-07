import os
from json import dumps
from server.file import fileManager, FileItem, create_file
from server.data_parser.xlsx import paginate_load_xlsx, ReadXLSXConfig
from server.data_parser.types import PaginationData
from server.data_parser.tests.utils import TestCase


TEST_DIR = os.path.dirname(__file__)
XLSX_FILE_PATH = os.path.join(TEST_DIR, "./assets/data.xlsx")
DEFAULT_SHEET_NAME = "Sheet1"

TEST_CASES: list[TestCase[ReadXLSXConfig, PaginationData[list[list]]]] = [
    {
        "description": "Test preview xlsx with default config",
        "config": {
            "page_size": 200,
            "page_token": None,
            "config": {
                "sheet_name": DEFAULT_SHEET_NAME,
                "header": 1,
            },
        },
        "judge": [
            (lambda data: len(data["data"]) == 200, "The length of data is not 200."),
            (lambda data: data["page_token"] == 0, "The returned page token is not 0."),
            (lambda data: data["data"][0][0] == "id", "The first row is not header."),
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
            (lambda data: len(data["data"]) == 200, "The length of data is not 200."),
            (lambda data: data["page_token"] == 1, "The returned page token is not 0."),
            (lambda data: data["data"][0][0] == 200, "The first row is wrong."),
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
            (lambda data: len(data["data"]) == 200, "The length of data is not 200."),
            (lambda data: data["page_token"] == 0, "The returned page token is not 0."),
            (lambda data: data["data"][0][0] == 1, "The first row is wrong."),
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
                lambda data: data["data"][0][0] == "id",
                "The first row is wrong.",
            ),
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
                lambda data: not create_file(
                    os.path.join(TEST_DIR, "preview.json"), dumps(data, indent=4), "w"
                ),
                "The first row is wrong.",
            ),
        ],
    },
]


def run_test_case(
    file: FileItem, test_case: TestCase[ReadXLSXConfig, PaginationData[list[list]]]
):
    data = paginate_load_xlsx(file, test_case["config"])
    for func, msg in test_case["judge"]:
        assert func(data), "".join([test_case["description"], ": ", msg])


def test_preview():
    with open(XLSX_FILE_PATH, "rb") as f:
        token = fileManager.save_file(
            "tenant_key", "base_id", "user_id", "test.xlsx", f.read()
        )
        file_item = fileManager.get_file(token)
    for test_case in TEST_CASES:
        run_test_case(file_item, test_case)
