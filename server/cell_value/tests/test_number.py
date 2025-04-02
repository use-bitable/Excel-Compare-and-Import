from typing import TypedDict
from enum import Enum

# from server.cell_value.number import parse_number_str

# def test_parse_number_str():
#     # assert parse_number_str("123") == "123"
#     # assert parse_number_str("-123") == "-123"
#     # assert parse_number_str("123.456") == "123.456"
#     # assert parse_number_str("-123.456") == "-123.456"
#     # assert parse_number_str("123%") == "1.23"
#     # assert parse_number_str("-123%") == "-1.23"
#     # assert parse_number_str("123.456%") == "1.23456"
#     # assert parse_number_str("-123.456%") == "-1.23456"
#     # assert parse_number_str("abc") is None
#     assert parse_number_str("12,345") == "12345"
# c = {
#     "a": 1,
#     "b": 2,
# }
# print(
#     (
#         1,
#         True,
#         {"text": "www.baidu.com", "link": "http://www.baidu.com"},
#         [1, 2, 3],
#         [
#             {"text": "sjssjssakxj,", "type": "text"},
#             {"link": "http://www.baidu.com", "text": "www.baidu.com", "type": "url"},
#             {"text": "", "type": "text"},
#         ],
#     )
#     == (
#         1,
#         True,
#         {"text": "www.baidu.com", "link": "http://www.baidu.com"},
#         [1, 2, 3],
#         [
#             {"text": "sjssjssakxj,", "type": "text"},
#             {"link": "http://www.baidu.com", "text": "www.baidu.com", "type": "url"},
#             {"text": "", "type": "text"},
#         ],
#     )
# )

# class FileAttachmentItem(TypedDict):
#     name: str
#     path: str

# attachments = {}
# attachments["asd"] = FileAttachmentItem(
#     name="test.png",
#     path="asd",
# )


# def create_attachment_item(attachments, attachment_item):
#     attachments[attachment_item.get("path")] = attachment_item
#     return attachment_item
# item = FileAttachmentItem(
#     name="test.png",
#     path="dsfcsssssfcs",
# )
# i = create_attachment_item(
#     attachments,
#     item,
# )


# print(i is item)
# print(attachments["dsfcsssssfcs"] is item)
class TestEnum(Enum):
    A = "A"
    B = "B"


print(TestEnum("A") == "A")
