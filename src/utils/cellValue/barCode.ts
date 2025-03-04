import { type IBarcodeField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

/**
 * Get barCode cell
 *
 * @param value
 * @param field
 * @returns
 */
async function barCode(value: string, field: IBarcodeField) {
  return await field.createCell(value)
}

export const BarCodeTranslator = defineTranslator({
  fieldType: FieldType.Barcode,
  translate: barCode,
  normalization: async (value: string) => value,
  name: "BarCode",
})
