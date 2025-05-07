"""The model of the append API."""

from werkzeug.datastructures import FileStorage
from .basic_model import basic_model
from .basic_import_model import basic_import_model

basic_append_model = {
    "type": "object",
    "required": [*basic_import_model["required"], *basic_model["required"]],
    "properties": {
        **basic_model["properties"],
        **basic_import_model["properties"],
    },
}

append_file_model = {
    "type": "object",
    "required": [*basic_append_model["required"], "file"],
    "properties": {
        **basic_append_model["properties"],
    },
}
