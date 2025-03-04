"""Data source model"""

data_source_model = {
    "type": "object",
    "required": [
        "type"
    ],
    "properties": {
        "type": {
            "type": "string",
            "description": "The type of data source",
            "enum": [
                "xlsx",
                "xls",
                "csv",
                "json",
                "url"
            ]
        },
        "excel": {
            "type": "object",
            "properties": {
                "sheet": {
                    "type": "string",
                    "description": "The name of the sheet"
                },
                "header": {
                    "type": "integer",
                    "description": "The row number of the header"
                }
            }
        },
    }
}
