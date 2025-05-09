import { FieldType } from "@lark-base-open/js-sdk"
import { TestItem } from "@/test/types"
import { numberTest } from "./number"
import { dateTimeTest } from "./dateTime"
import { textTest } from "./text"
import { singleSelectTest } from "./singleSelect"
import { multiSelectTest } from "./multiSelect"
import { attachmentTest } from "./attachment"
import { autoNumberTest } from "./autoNumber"
import { formulaTest } from "./formula"
import { barCodeTest } from "./barCode"
import { checkboxTest } from "./checkbox"
import { currencyTest } from "./currency"
import { duplexLinkTest } from "./duplexLink"
import { locationTest } from "./location"
import { modifiedTimeTest } from "./modifiedTime"
import { createdTimeTest } from "./createdTime"
import { phoneTest } from "./phone"
import { progressTest } from "./progress"
import { ratingTest } from "./rating"
import { singleLinkTest } from "./singleLink"
import { urlTest } from "./url"
import { userTest } from "./user"

export const testData: Record<number, TestItem> = {
  [FieldType.Number]: numberTest,
  [FieldType.DateTime]: dateTimeTest,
  [FieldType.Text]: textTest,
  [FieldType.SingleSelect]: singleSelectTest,
  [FieldType.MultiSelect]: multiSelectTest,
  [FieldType.Attachment]: attachmentTest,
  [FieldType.AutoNumber]: autoNumberTest,
  [FieldType.Formula]: formulaTest,
  [FieldType.Barcode]: barCodeTest,
  [FieldType.Checkbox]: checkboxTest,
  [FieldType.Currency]: currencyTest,
  [FieldType.DuplexLink]: duplexLinkTest,
  [FieldType.Location]: locationTest,
  [FieldType.ModifiedTime]: modifiedTimeTest,
  [FieldType.CreatedTime]: createdTimeTest,
  [FieldType.Phone]: phoneTest,
  [FieldType.Progress]: progressTest,
  [FieldType.Rating]: ratingTest,
  [FieldType.SingleLink]: singleLinkTest,
  [FieldType.Url]: urlTest,
  [FieldType.User]: userTest,
}
