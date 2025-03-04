import { FieldType } from "@lark-base-open/js-sdk"

export const hasChildrenFieldType = [FieldType.SingleLink, FieldType.DuplexLink]

export const indexFieldType = [
  FieldType.Text,
  FieldType.Number,
  FieldType.DateTime,
  FieldType.Barcode,
  FieldType.Phone,
  FieldType.AutoNumber,
  FieldType.Currency,
  FieldType.Progress,
  FieldType.Rating,
  FieldType.Url,
  FieldType.CreatedTime,
  FieldType.Formula,
  FieldType.Location,
  FieldType.CreatedUser,
  FieldType.ModifiedTime,
  FieldType.ModifiedUser,
]

export const notSupportFields = [
  FieldType.NotSupport,
  FieldType.Denied,
  FieldType.Object,
]
export const SelectFieldType = [FieldType.SingleSelect, FieldType.MultiSelect]

export const linkFieldType = [FieldType.SingleLink, FieldType.DuplexLink]

export const autoFields = [
  FieldType.CreatedTime,
  FieldType.ModifiedTime,
  FieldType.CreatedUser,
  FieldType.ModifiedUser,
  FieldType.AutoNumber,
  FieldType.GroupChat,
  FieldType.Formula,
]

export const FieldNameList = {
  [FieldType.DateTime]: "dateTime",
  [FieldType.Checkbox]: "checkBox",
  [FieldType.Phone]: "phone",
  [FieldType.Text]: "text",
  [FieldType.Barcode]: "barCode",
  [FieldType.MultiSelect]: "multiSelect",
  [FieldType.SingleSelect]: "singleSelect",
  [FieldType.Currency]: "currency",
  [FieldType.Number]: "number",
  [FieldType.Progress]: "progress",
  [FieldType.Rating]: "rating",
  [FieldType.Url]: "url",
  [FieldType.User]: "user",
  [FieldType.SingleLink]: "singleLink",
  [FieldType.DuplexLink]: "duplexLink",
  [FieldType.Lookup]: "lookup",
  [FieldType.CreatedTime]: "createdTime",
  [FieldType.ModifiedTime]: "modifiedTime",
  [FieldType.Formula]: "formula",
  [FieldType.CreatedUser]: "createdUser",
  [FieldType.ModifiedUser]: "modifiedUser",
  [FieldType.NotSupport]: "notSupport",
  [FieldType.Location]: "location",
  [FieldType.AutoNumber]: "autoNumber",
  [FieldType.GroupChat]: "groupChat",
  [FieldType.Denied]: "denied",
  [FieldType.Attachment]: "attachment",
  [FieldType.Email]: "email",
}
