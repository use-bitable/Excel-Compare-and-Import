"""The fields map model for the request body of the API."""

fields_map_model = {
    "type": "object",
    "required": [
        "name",
        "sourceField",
    ],
    "properties": {
        "name": {"type": "string", "description": "Base field name"},
        "sourceField": {"type": "string", "description": "Data source field name"},
        "config": {
            "type": "object",
            "properties": {
                "format": {"type": "string", "description": "Format"},
                "separator": {"type": "string", "description": "Separator"},
                "boolValue": {
                    "type": "object",
                    "properties": {
                        "true": {"type": "array", "items": {"type": "string"}},
                        "false": {"type": "array", "items": {"type": "string"}},
                    },
                },
                "requestConfig": {
                    "type": "object",
                    "properties": {
                        "method": {
                            "type": "string",
                            "description": "The method of the request",
                            "enum": ["GET", "POST"],
                        },
                        "headers": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                    "minItems": 2,
                                    "maxItems": 2,
                                },
                            },
                        },
                        "body": {
                            "type": "string",
                        },
                    },
                },
                "locationConfig": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "description": "The type of the location",
                            "enum": ["geo", "regeo", "auto"],
                        }
                    },
                },
            },
        },
    },
}
