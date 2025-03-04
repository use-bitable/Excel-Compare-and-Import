import { type IRatingField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"
import { normalization } from "./number"

/**
 * Get rating cell
 *
 * @param value
 * @param field
 * @returns
 */
async function rating(value: string, field: IRatingField) {
  const v = await normalization(value)
  return await field.createCell(v)
}

export const RatingTranslator = defineTranslator({
  fieldType: FieldType.Rating,
  translate: rating,
  normalization,
  name: "Rating",
})
