import dayjs from "dayjs/esm/index.js"
import customParseFormat from "dayjs/plugin/customParseFormat"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { type IDateTimeField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"
import type { fieldMap } from "@/types/types"

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

export const dateDefaultFormat = "YYYY/MM/DD"

export async function normalization(
  value: string,
  config?: fieldMap["config"],
) {
  const { format = dateDefaultFormat } = config || {}
  return dayjs(value, format).valueOf()
}

/**
 * Get dateTime cell
 *
 * @param value
 * @param field
 * @param config
 * @returns
 */
async function dateTime(
  value: string,
  field: IDateTimeField,
  config?: fieldMap["config"],
) {
  const v = await normalization(value, config)
  return await field.createCell(v)
}

export const DateTimeTranslator = defineTranslator({
  fieldType: FieldType.DateTime,
  translate: dateTime,
  normalization,
  name: "DateTime",
})
