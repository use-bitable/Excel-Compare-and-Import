import { defineTranslator, FieldRole } from "./cell"
import { FieldType } from "@lark-base-open/js-sdk"
import { normalization } from "./date"

export const CreatedTimeTranslator = defineTranslator({
  fieldType: FieldType.CreatedTime,
  normalization,
  name: "CreatedTime",
  roles: [FieldRole.AUTO],
})
