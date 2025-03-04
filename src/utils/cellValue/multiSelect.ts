import { type IMultiSelectField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator, FieldRole } from "./cell"
import type { fieldMap } from "@/types/types"

export const defaultSeparator = ","

async function normalization(value: string, config?: fieldMap["config"]) {
  const { separator = defaultSeparator } = config || {}
  return value.split(separator)
}

/**
 * Get multiSelect cell
 *
 * @param value
 * @param field
 * @param config
 * @returns
 */
async function multiSelect(
  value: string,
  field: IMultiSelectField,
  config: fieldMap["config"] = {},
) {
  const values = await normalization(value, config)
  return await field.createCell(values)
}

export const MultiSelectTranslator = defineTranslator({
  fieldType: FieldType.MultiSelect,
  translate: multiSelect,
  normalization,
  name: "MultiSelect",
  roles: [FieldRole.HAS_OPTIONS],
})
