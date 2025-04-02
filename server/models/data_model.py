import orjson
from flask_restx import fields
from .authorization_model import authorization_model


def paginate_config_type(value):
    if not isinstance(value, str):
        raise ValueError("Config must be a JSON string")
    parsed_json = orjson.loads(value)
    return parsed_json


paginate_config_type.__scheme__ = {
    "type": "object",
    "format": "paginate_config",
}

data_preview_model = {
    "type": "object",
    "required": [*authorization_model["required"]],
    "properties": {
        **authorization_model["properties"],
        "page_size": {
            "type": int,
            "minimum": 1,
            "location": "args",
        },
        "page_token": {
            "type": int,
            "minimum": 0,
            "location": "args",
        },
        "config": {
            "type": paginate_config_type,
            "location": "json",
            "description": "The JSON string of configuration for reading data",
        },
    },
}
