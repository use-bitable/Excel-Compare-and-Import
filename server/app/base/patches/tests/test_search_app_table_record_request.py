from baseopensdk import BaseClient


def test_patch():
    client = (
        BaseClient.builder()
        .app_token("app_token")
        .personal_base_token("personal_base_token")
        .domain("domain")
        .build()
    )
    assert client.base.v1.app_table_record.search is not None
