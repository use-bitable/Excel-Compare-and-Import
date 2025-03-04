#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Base Client Module

from baseopensdk import BaseClient, FEISHU_DOMAIN, LARK_DOMAIN
from .const import BASE_PRODUCT

BASE_DOMAIN = {
    "FEISHU": FEISHU_DOMAIN,
    "LARK": LARK_DOMAIN,
}


def create_client(
        base_id: str,
        personal_base_token: str,
        product: BASE_PRODUCT = "FEISHU",
) -> BaseClient:
    """Create a Base client."""
    assert base_id and \
        personal_base_token, "Base ID and Personal Base Token must be provided"
    assert product in BASE_PRODUCT, f"Product must be one of {BASE_PRODUCT}"
    return BaseClient.builder()\
        .app_token(base_id)\
        .personal_base_token(personal_base_token)\
        .domain(BASE_DOMAIN[product.upper()])\
        .build()
