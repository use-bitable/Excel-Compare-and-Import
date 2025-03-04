import { FieldType } from "@lark-base-open/js-sdk"

export const iconList: Record<number, any> = {
  [FieldType.DateTime]: () => import("@/components/icons/dateTime-icon.vue"),
  [FieldType.Checkbox]: () => import("@/components/icons/checkBox-icon.vue"),
  [FieldType.Phone]: () => import("@/components/icons/phone-icon.vue"),
  [FieldType.Text]: () => import("@/components/icons/text-icon.vue"),
  [FieldType.Barcode]: () => import("@/components/icons/barCode-icon.vue"),
  [FieldType.MultiSelect]: () =>
    import("@/components/icons/multiSelect-icon.vue"),
  [FieldType.SingleSelect]: () =>
    import("@/components/icons/singleSelect-icon.vue"),
  [FieldType.Currency]: () => import("@/components/icons/currency-icon.vue"),
  [FieldType.Number]: () => import("@/components/icons/number-icon.vue"),
  [FieldType.Progress]: () => import("@/components/icons/progress-icon.vue"),
  [FieldType.Rating]: () => import("@/components/icons/rating-icon.vue"),
  [FieldType.Url]: () => import("@/components/icons/url-icon.vue"),
  [FieldType.User]: () => import("@/components/icons/user-icon.vue"),
  [FieldType.SingleLink]: () =>
    import("@/components/icons/singleLink-icon.vue"),
  [FieldType.DuplexLink]: () =>
    import("@/components/icons/duplexLink-icon.vue"),
  [FieldType.Formula]: () => import("@/components/icons/formula-icon.vue"),
  [FieldType.ModifiedTime]: () =>
    import("@/components/icons/modifiedTime-icon.vue"),
  [FieldType.CreatedTime]: () =>
    import("@/components/icons/createdTime-icon.vue"),
  [FieldType.AutoNumber]: () =>
    import("@/components/icons/autoNumber-icon.vue"),
  [FieldType.Attachment]: () =>
    import("@/components/icons/attachment-icon.vue"),
  [FieldType.Location]: () => import("@/components/icons/location-icon.vue"),
  [FieldType.CreatedUser]: () =>
    import("@/components/icons/createdUser-icon.vue"),
  [FieldType.GroupChat]: () => import("@/components/icons/groupChat-icon.vue"),
  [FieldType.Lookup]: () => import("@/components/icons/lookup-icon.vue"),
  [FieldType.ModifiedUser]: () =>
    import("@/components/icons/modifiedUser-icon.vue"),
  [FieldType.Email]: () => import("@/components/icons/email-icon.vue"),
}
