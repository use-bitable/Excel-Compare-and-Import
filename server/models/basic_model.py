"""The basic model for the request body of the API."""
basic_model = {
  "type": "object",
  "required": [
      "baseId",
      "personalBaseToken",
      "tenantId",
  ],
  "properties": {
    "baseId": {
      "type": str,
      "description": "The ID of the base"
    },
    "personalBaseToken": {
      "type": str,
      "description": "The PersonalBaseToken of the base"
    },
    "productDomain": {
      "type": str,
      "description": "The domain of the product",
      "enum": [
        "FEISHU",
        "LARK"
      ],
      "default": "FEISHU"
    },
    "tenantId": {
      "type": str,
      "description": "The tenant ID"
    },
    "userId": {
      "type": str,
      "description": "The user ID"
    },
  }
}
