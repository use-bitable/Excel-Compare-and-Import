import type { fieldMap } from "@/types/types"
import { Warn, autoFields } from "@/utils"

/**
 * Validate if index is empty or has no excel_field, if yes, return false, else return true
 *
 * @param index
 * @returns
 */
export function validateIndex(index: fieldMap[]) {
  if (index.length === 0) {
    Warn({
      title: "noIndex",
      message: "noIndex",
      notice: true,
      noticeParams: {
        text: "message.noIndex",
      },
    })
    return false
  }
  const noExcelField = index.filter((i) => !i.excel_field)
  if (noExcelField.length) {
    const names = noExcelField.map((i) => i.field.name).join(", ")
    Warn({
      title: "noExcelField",
      message: names,
      notice: true,
      noticeParams: {
        text: "message.indexNoExcelField",
        params: {
          fields: names,
        },
      },
    })
    return false
  }
  return true
}

/**
 * Validate if index contains auto field, if yes, return true, else return false
 *
 * @param index
 * @returns
 */
export function validateIndexAuto(index: fieldMap[]) {
  const auto = index.filter((i) => autoFields.includes(i.field.type))
  if (auto.length) {
    const names = auto.map((i) => i.field.name).join(", ")
    Warn({
      title: "autoFieldInIndex",
      message: "autoFieldInIndex: " + names,
      notice: true,
      noticeParams: {
        text: "message.autoFieldInIndex",
        params: {
          fields: names,
        },
      },
    })
    return true
  }
  return false
}
