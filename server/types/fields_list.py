"""fieldsList type"""

import json


def fields_list(value: str):
    """JSON string of List[str]"""
    if not isinstance(value, str):
        raise ValueError("fieldsList must be a JSON string")
    field_list = json.loads(value)
    if not isinstance(field_list, list):
        raise ValueError("Parsed fieldsList must be a list")
    for field in field_list:
        if not isinstance(field, str):
            raise ValueError("fieldsList must be a list of strings")
    return field_list
