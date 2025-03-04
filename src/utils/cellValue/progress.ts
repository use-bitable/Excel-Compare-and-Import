import { type IProgressField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"
import { normalization } from "./number"

/**
 * Get progress cell
 *
 * @param value
 * @param field
 * @returns
 */
async function progress(value: string, field: IProgressField) {
  const v = await normalization(value)
  return await field.createCell(v)
}

export const ProgressTranslator = defineTranslator({
  fieldType: FieldType.Progress,
  translate: progress,
  name: "Progress",
  normalization,
})
