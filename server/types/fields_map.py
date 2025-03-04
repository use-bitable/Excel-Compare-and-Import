"""Custom type for fieldsMap"""
import json


def fields_map(value: str):
    """JSON string of List[fieldMap_model]"""
    if not isinstance(value, str):
        raise ValueError("fieldsMap must be a JSON string")
    field_map = json.loads(value)
    if not isinstance(field_map, list):
        raise ValueError("Parsed fieldsMap must be a list")
    for field in field_map:
        if not isinstance(field, dict):
            raise ValueError("fieldsMap must be a list of objects")
        if 'name' not in field:
            raise ValueError("fieldsMap must have a name")
        if 'sourceField' not in field and 'config' not in field:
            raise ValueError("fieldsMap must have a sourceField of config")
    return field_map


fields_map.__schema__ = {
    "type": "string",
    "format": "List[fieldMap_model]",
}
