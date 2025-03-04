import { type ISingleSelectField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator, FieldRole } from "./cell"

/**
 * Get singleSelect cell
 * @param field
 * @param value
 * @returns
 */
async function singleSelect(value: string, field: ISingleSelectField) {
  return await field.createCell(value)
}

export const SingleSelectTranslator = defineTranslator({
  fieldType: FieldType.SingleSelect,
  translate: singleSelect,
  normalization: async (value: string) => value,
  name: "SingleSelect",
  roles: [FieldRole.HAS_OPTIONS],
})
