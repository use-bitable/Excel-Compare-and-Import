import { type IUrlField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

/**
 * Get url cell
 *
 * @param value
 * @param field
 * @returns
 */
async function url(value: string, field: IUrlField) {
  return await field.createCell(value)
}

export const UrlTranslator = defineTranslator({
  fieldType: FieldType.Url,
  translate: url,
  normalization: async (value: string) => value,
  name: "Url",
})
