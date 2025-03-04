import { type IPhoneField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

/**
 * Get phone cell
 *
 * @param value
 * @param field
 * @returns
 */
async function phone(value: string, field: IPhoneField) {
  return await field.createCell(value)
}

export const PhoneTranslator = defineTranslator({
  fieldType: FieldType.Phone,
  translate: phone,
  normalization: async (value: string) => value,
  name: "Phone",
})
