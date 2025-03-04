"""The model of the upload API."""
from werkzeug.datastructures import FileStorage
from .authorization_model import authorization_model

upload_model = {
    "type": "object",
    "required": [
        "filename",
        "file",
        *authorization_model["required"]
    ],
    "properties": {
        **authorization_model["properties"],
        "file": {
            "type": FileStorage,
            "description": ".xls,.xlsx,.csv,.json file",
            "location": "files",
        },
        "filename": {
            "type": str,
            "location": "form",
            "description": "The name of the file."
        },
    }
}

start_upload_chunk_model = {
    "type": "object",
    "required": [
        "filename",
        "size",
        "chunks",
        "md5",
        *authorization_model["required"],
    ],
    "properties": {
        **authorization_model["properties"],
        "filename": {
            "type": str,
            "location": "json",
            "description": "The name of the file."
        },
        "md5": {
            "type": str,
            "location": "json",
            "description": "The md5 of the file."
        },
        "size": {
            "type": int,
            "location": "json",
            "description": "The size of the file."
        },
        "chunks": {
            "type": int,
            "location": "json",
            "description": "The number of the chunks."
        }
    }
}

upload_chunk_model = {
    "type": "object",
    "required": [
        "token",
        "index",
        "file",
        *authorization_model["required"]
    ],
    "properties": {
        **authorization_model["properties"],
        "token": {
            "type": str,
            "location": "form",
            "description": "The token of the file."
        },
        "index": {
            "type": int,
            "location": "form",
            "description": "The index of the chunk."
        },
        "file": {
            "type": FileStorage,
            "location": "files",
            "description": "The chunk file."
        },
    }
}

assemble_chunk_model = {
    "type": "object",
    "required": [
        "token",
        *authorization_model["required"],
    ],
    "properties": {
        **authorization_model["properties"],
        "token": {
            "type": str,
            "location": "json",
            "description": "The token of the file."
        },
    }
}

delete_file_model = {
    "type": "object",
    "required": [
        "token",
        *authorization_model["required"]
    ],
    "properties": {
        **authorization_model["properties"],
        "token": {
            "type": str,
            "location": "json",
            "description": "The token of the file."
        },
    }
}