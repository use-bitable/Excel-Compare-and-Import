import { type ICurrencyField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

async function normalization(value: string) {
  return Number(value.match(/-?\d+\.?\d*/g))
}

/**
 * Get currency cell
 *
 * @param value
 * @param field
 * @returns
 */
async function currency(value: string | null, field: ICurrencyField) {
  if (value === null) return null
  const v = await normalization(value)
  return await field.createCell(v)
}

export const CurrencyTranslator = defineTranslator({
  fieldType: FieldType.Currency,
  translate: currency,
  normalization,
  name: "Currency",
})
