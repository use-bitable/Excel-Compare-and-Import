from baseopensdk import BaseClient, FEISHU_DOMAIN
from enum import Enum
from app.base.record import get_base_table_records


# def test_get_records():
#     client = (
#         BaseClient.builder()
#         .app_token("W1LnbUzDkaNj5zsuIjfcPPzbn6e")
#         .personal_base_token(
#             "pt-ApsdmDzoKc9vpu66XbUwchLdLklfpwsXY-3c1GSVAQAAHICBXgIAQONoEbZF"
#         )
#         .domain(FEISHU_DOMAIN)
#         .build()
#     )
#     query = get_base_table_records(
#         table_id="tblxarg8wkDhmjW1",
#         base_client=client,
#         page_size=10,
#     )
#     records = query()
