import { type INumberField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

export async function normalization(value: string) {
  const { divide } = await import("mathjs")
  const v = value.match(/-?\d+\.?\d*/g)
  const percentage = /-?\d+\.?\d*%/g.test(value)
  const res = percentage ? divide(Number(v), 100) : Number(v)
  return res
}

/**
 * Get number cell
 *
 * @param value
 * @param field
 * @returns
 */
async function number(value: string, field: INumberField) {
  const v = await normalization(value)
  return await field.createCell(v)
}

export const NumberTranslator = defineTranslator({
  fieldType: FieldType.Number,
  translate: number,
  normalization,
  name: "Number",
})
