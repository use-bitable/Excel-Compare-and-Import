import { type ICheckBoxField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"
import type { fieldMap } from "@/types/types"
export const defaultBoolValue = {
  true: ["是", "True", "true", "TRUE", "1", "☑️"],
  false: ["否", "False", "false", "FALSE", "0", ""],
}

async function normalization(value: string, config?: fieldMap["config"]) {
  const { boolValue = defaultBoolValue } = config || {}
  return boolValue.true.includes(value)
}

/**
 * Get checkBox cell
 *
 * @param value
 * @param field
 * @param config
 * @returns
 */
async function checkBox(
  value: string,
  field: ICheckBoxField,
  config?: fieldMap["config"],
) {
  const v = await normalization(value, config)
  return await field.createCell(v)
}

export const CheckBoxTranslator = defineTranslator({
  fieldType: FieldType.Checkbox,
  translate: checkBox,
  normalization,
  name: "CheckBox",
})
