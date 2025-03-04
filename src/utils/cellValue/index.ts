import {
  type IOpenCellValue,
  checkers,
  type IOpenSingleCellValue,
} from "@lark-base-open/js-sdk"
import { DateTimeTranslator } from "./date"
import { MultiSelectTranslator } from "./multiSelect"
import { SingleSelectTranslator } from "./singleSelect"
import { CheckBoxTranslator } from "./checkBox"
import { TextTranslator } from "./text"
import { UrlTranslator } from "./url"
import { PhoneTranslator } from "./phone"
import { CurrencyTranslator } from "./currency"
import { ProgressTranslator } from "./progress"
import { RatingTranslator } from "./rating"
import { BarCodeTranslator } from "./barCode"
import { UserTranslator } from "./user"
import { SingleLinkTranslator } from "./singleLink"
import { DuplexTranslator } from "./duplexLink"
import { NumberTranslator } from "./number"
import { AttachmentTranslator } from "./attachment"
import { CellTranslator } from "./cell"
import { ModifiedTimeTranslator } from "./modifiedTime"
import { CreatedTimeTranslator } from "./createdTime"
import { EmailTranslator } from "./email"

export const cellTranslator = new CellTranslator({
  translators: [
    DateTimeTranslator,
    MultiSelectTranslator,
    SingleSelectTranslator,
    CheckBoxTranslator,
    TextTranslator,
    UrlTranslator,
    PhoneTranslator,
    CurrencyTranslator,
    ProgressTranslator,
    RatingTranslator,
    BarCodeTranslator,
    UserTranslator,
    SingleLinkTranslator,
    DuplexTranslator,
    NumberTranslator,
    AttachmentTranslator,
    ModifiedTimeTranslator,
    CreatedTimeTranslator,
    EmailTranslator,
  ],
})

/**
 * Transform cellValue to string
 * @param value
 * @returns
 */
export function cellValueToString(
  value: IOpenCellValue | IOpenSingleCellValue,
): string {
  if (checkers.isSegments(value)) {
    return value.map((v) => v.text).join("")
  }
  if (checkers.isAutoNumber(value)) {
    return value.value
  }
  if (checkers.isTimestamp(value) || checkers.isNumber(value)) {
    return String(value)
  }
  if (checkers.isAttachment(value)) {
    return value.name
  }
  if (checkers.isSingleSelect(value)) {
    return value.text
  }
  if (checkers.isMultiSelect(value)) {
    return value.map((v) => v.text).join(",")
  }
  if (checkers.isCheckbox(value)) {
    return value ? "☑️" : ""
  }
  if (checkers.isUsers(value)) {
    return value.map((v) => v.id).join(",")
  }
  if (checkers.isEmpty(value)) {
    return ""
  }
  if (checkers.isLocation(value)) {
    return value.fullAddress
  }
  if (checkers.isLocation(value)) {
    return value.fullAddress
  }
  if (checkers.isLink(value)) {
    return value.text
  }
  if (checkers.isAttachments(value)) {
    return value.map((v) => v.name).join(",")
  }
  if (checkers.isPhone(value)) {
    return value
  }
  if (checkers.isGroupChat(value)) {
    return value.name
  }
  if (Array.isArray(value)) {
    return value.map((v) => cellValueToString(v)).join(",")
  }
  return JSON.stringify(value)
}
