"""Basic import model for the import of data."""
from ..types import fields_map, data_source, fields_list

basic_import_model = {
    "type": "object",
    "required": [
        "source",
        "fields"
    ],
    "properties": {
        "source": {
            "type": data_source,
            "description": "Data source"
        },
        "fields": {
            "type": fields_list,
            "description": "Base fields to import"
        },
        "fieldsMap": {
            "type": fields_map,
            "description": "JSON string of List[fieldMap_model]",
        }
    }
}
