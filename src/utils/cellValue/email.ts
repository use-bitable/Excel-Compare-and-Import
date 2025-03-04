import { type IEmailField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

/**
 * Get text cell
 *
 * @param value
 * @param field
 * @returns
 */
async function email(value: string, field: IEmailField) {
  return await field.createCell(value)
}

export const EmailTranslator = defineTranslator({
  fieldType: FieldType.Email,
  translate: email,
  normalization: async (value: string) => value,
  name: "Email",
})
