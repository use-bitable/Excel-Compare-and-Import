import { type IDuplexLinkField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"
import type { fieldMap } from "@/types/types"

export const duplexLinkSeparator = ","

interface LinkCache {
  multiple: boolean
  tableId: string
}

let cache: Record<string, LinkCache> = {}

async function normalization(value: string, config?: fieldMap["config"]) {
  const { separator = duplexLinkSeparator } = config || {}
  return value.split(separator)
}

async function setCache(field: IDuplexLinkField) {
  const [tableId, multiple] = await Promise.all([
    field.getTableId(),
    field.getMultiple(),
  ])
  cache[field.id] = {
    multiple,
    tableId,
  }
  return {
    multiple,
    tableId,
  }
}

function refreshCache() {
  cache = {}
}

/**
 * Get duplexLink cell
 *
 * @param value
 * @param field
 * @param config
 * @returns
 */
async function duplexLink(
  value: string,
  field: IDuplexLinkField,
  config?: fieldMap["config"],
) {
  const ids = await normalization(value, config)
  const { tableId, multiple } = cache[field.id] || (await setCache(field))
  return await field.createCell({
    recordIds: multiple ? ids : Array(ids[0]),
    tableId,
    type: "text",
    text: "",
    record_ids: multiple ? ids : Array(ids[0]),
    table_id: tableId,
  })
}

export const DuplexTranslator = defineTranslator({
  fieldType: FieldType.DuplexLink,
  translate: duplexLink,
  name: "DuplexLink",
  normalization,
  refresh: refreshCache,
})
