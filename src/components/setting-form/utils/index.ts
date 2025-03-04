import { FieldType } from "@lark-base-open/js-sdk"
import { dateDefaultFormat } from "@/utils/cellValue/date"
import { defaultSeparator as multiSelectSeparator } from "@/utils/cellValue/multiSelect"
import { defaultBoolValue } from "@/utils/cellValue/checkBox"
import { singleLinkSeparator } from "@/utils/cellValue/singleLink"
import { duplexLinkSeparator } from "@/utils/cellValue/duplexLink"
import type { fieldMap } from "@/types/types"

export const hasChildrenFieldType = [FieldType.SingleLink, FieldType.DuplexLink]

const fieldsConfig: { [key: number]: fieldMap["config"] } = {
  [FieldType.DateTime]: {
    format: dateDefaultFormat,
  },
  [FieldType.MultiSelect]: {
    separator: multiSelectSeparator,
  },
  [FieldType.Checkbox]: {
    boolValue: defaultBoolValue,
  },
  [FieldType.SingleLink]: {
    separator: singleLinkSeparator,
  },
  [FieldType.DuplexLink]: {
    separator: duplexLinkSeparator,
  },
  [FieldType.Attachment]: {
    separator: ",",
    requestConfig: {
      method: "GET",
      headers: [],
      body: "",
    },
  },
  [FieldType.ModifiedTime]: {
    format: dateDefaultFormat,
  },
  [FieldType.CreatedTime]: {
    format: dateDefaultFormat,
  },
}

export function configField(type: FieldType) {
  return fieldsConfig[type] || {}
}

export * from "./validate"
