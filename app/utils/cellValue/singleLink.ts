import { type ISingleLinkField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"
import type { fieldMap } from "@/types/types"

export const singleLinkSeparator = ","

interface LinkCache {
  multiple: boolean
  tableId: string
}

let cache: Record<string, LinkCache> = {}

async function setCache(field: ISingleLinkField) {
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

async function normalization(value: string, config?: fieldMap["config"]) {
  const { separator = singleLinkSeparator } = config || {}
  return value.split(separator)
}

/**
 *
 * @param value
 * @param field
 * @returns
 */
async function singleLink(
  value: string,
  field: ISingleLinkField,
  config?: fieldMap["config"],
) {
  const ids = await normalization(value, config)
  const { tableId, multiple } = cache[field.id] || (await setCache(field))
  const recordIds = multiple ? ids : Array(ids[0])
  return await field.createCell({
    recordIds,
    tableId,
    type: "text",
    text: "",
    record_ids: recordIds,
    table_id: tableId,
  })
}

export const SingleLinkTranslator = defineTranslator({
  fieldType: FieldType.SingleLink,
  translate: singleLink,
  name: "SingleLink",
  normalization,
  refresh: refreshCache,
})
