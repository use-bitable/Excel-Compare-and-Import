import { type ITextField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

/**
 * Get text cell
 *
 * @param value
 * @param field
 * @returns
 */
async function text(value: string, field: ITextField) {
  return await field.createCell(value)
}

export const TextTranslator = defineTranslator({
  fieldType: FieldType.Text,
  translate: text,
  normalization: async (value: string) => value,
  name: "Text",
})
