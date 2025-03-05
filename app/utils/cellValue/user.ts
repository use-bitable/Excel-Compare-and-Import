import { type IUserField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"
import type { fieldMap } from "@/types/types"

export const userSeparator = ","

interface UserCache {
  multiple: boolean
}

let cache: Record<string, UserCache> = {}

async function setCache(field: IUserField) {
  const multiple = await field.getMultiple()
  cache[field.id] = {
    multiple,
  }
  return {
    multiple,
  }
}

function refreshCache() {
  cache = {}
}

async function normalization(value: string, config?: fieldMap["config"]) {
  const { separator = userSeparator } = config || {}
  return value.split(separator)
}

/**
 * Get user cell
 *
 * @param openId
 * @param field
 * @param config
 * @returns
 */
async function User(
  openId: string,
  field: IUserField,
  config?: fieldMap["config"],
) {
  const { multiple } = cache[field.id] || (await setCache(field))
  const users = await normalization(openId, config)
  return await field.createCell(
    multiple
      ? users.map((u) => ({
          id: u,
        }))
      : { id: users[0] },
  )
}

export const UserTranslator = defineTranslator({
  fieldType: FieldType.User,
  translate: User,
  name: "User",
  normalization,
  refresh: refreshCache,
})
