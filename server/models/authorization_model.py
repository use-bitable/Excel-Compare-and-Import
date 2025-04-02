user_token_model = {
    "type": "object",
    "required": ["tenant_key", "base_id", "user_id", "PersonalBaseToken"],
    "properties": {
        "PersonalBaseToken": {
            "type": str,
            "location": "headers",
            "description": "The personal base token.",
        },
        "tenant_key": {
            "type": str,
            "description": "The tenant key.",
            "location": "json",
        },
        "base_id": {"type": str, "description": "The base id.", "location": "json"},
        "user_id": {"type": str, "description": "The user id.", "location": "json"},
        "product": {
            "type": str,
            "description": "The product type.",
            "location": "json",
            "default": "FEISHU",
            "enum": ["FEISHU", "LARK"],
        },
    },
}

authorization_model = {
    "type": "object",
    "required": ["Authorization", "PersonalBaseToken"],
    "properties": {
        "Authorization": {
            "type": str,
            "location": "headers",
            "description": "The user token.",
        },
        "PersonalBaseToken": {
            "type": str,
            "location": "headers",
            "description": "The personal base token.",
        },
    },
}
