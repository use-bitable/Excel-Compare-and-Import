import { defineTranslator, FieldRole } from "./cell"
import { FieldType } from "@lark-base-open/js-sdk"
import { normalization } from "./date"

export const ModifiedTimeTranslator = defineTranslator({
  fieldType: FieldType.ModifiedTime,
  normalization,
  name: "CreatedTime",
  roles: [FieldRole.AUTO],
})
