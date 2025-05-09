import { defaultBoolValue } from "@/utils/cellValue/checkBox"
import type { fieldMap } from "@/types/types"
import {
  type MaybeRefOrGetter,
  toValue,
  watch,
  h,
  type VNode,
  ref,
  shallowRef,
} from "vue"
import { FieldType } from "@lark-base-open/js-sdk"
import {
  ElInput,
  ElFormItem,
  ElTooltip,
  ElText,
  ElLink,
  ElIcon,
  ElSelectV2,
  ElButton,
  ElRow,
  ElAlert,
} from "element-plus"
import { InfoFilled, Plus, CloseBold } from "@element-plus/icons-vue"
import { i18n } from "@/i18n"
import dayjs from "dayjs"

const dateFormatList = [
  "YYYY/MM/DD",
  "YYYY/MM/DD HH:mm:ss",
  "YYYY/M/D HH:mm",
  "YYYY-MM-DD",
  "YYYY-MM-DD HH:mm:ss",
  "YYYY-MM-DD HH:mm",
  "YYYY-MM-DD HH",
  "YYYY-MM",
  "YYYY",
  "MM-DD",
  "MM-DD HH:mm:ss",
  "MM-DD HH:mm",
  "MM-DD HH",
  "YYYYMMDD",
]

export function useFieldConfig(
  config: MaybeRefOrGetter<fieldMap["config"] | undefined>,
  type: MaybeRefOrGetter<FieldType | undefined>,
  except: MaybeRefOrGetter<string[]> = [],
) {
  const configList = ref<string[]>([])
  const configForm = shallowRef<() => VNode | VNode[]>()
  const configResult = ref<fieldMap["config"]>({})
  const formatExample = ref<any>("")
  watch(
    () => toValue(config),
    (newVal) => {
      if (!newVal) return
      configList.value = Object.keys(newVal).filter(
        (v) => !toValue(except).includes(v),
      )
      configResult.value = JSON.parse(JSON.stringify(newVal))
      if (newVal.format) {
        formatExample.value = formatExamples[
          toValue(type) as keyof typeof formatExamples
        ](newVal.format)
      }
      render()
    },
    { deep: true },
  )

  const render = () => {
    configForm.value = () =>
      configList.value.map((v) => configFormItem[v]?.()).flat()
  }

  const configFormItem: { [key: string]: any } = {
    format: () => [
      h(
        ElAlert,
        {
          type: "info",
          showIcon: true,
          title: "TIPS",
          style: "margin-bottom: 10px",
        },
        {
          default: () => [
            h("span", null, [
              i18n.global.t("alert.dateAsText") +
                ", " +
                i18n.global.t("toolTip.pleaseReferTo"),
              h(
                ElLink,
                {
                  type: "primary",
                  href: "https://ct8hv7vfy1.feishu.cn/docx/EOALdRssWoxksuxy7gucmECQnEc#ErLgdnUNJoxPo4xkraycQIKln6g",
                  target: "_blank",
                },
                {
                  default: () => i18n.global.t("guide"),
                },
              ),
            ]),
          ],
        },
      ),
      h(
        ElFormItem,
        {},
        {
          default: () => [
            h(ElSelectV2, {
              modelValue: configResult.value.format,
              ["onUpdate:modelValue"]: (v: string) => {
                configResult.value.format = v
                formatExample.value =
                  formatExamples[toValue(type) as keyof typeof formatExamples](
                    v,
                  )
              },
              filterable: true,
              allowCreate: true,
              placeholder: i18n.global.t(
                "input.placeholder.chooseOrCreateFormat",
              ),
              defaultFirstOption: true,
              options: formatList[toValue(type) as keyof typeof formatList].map(
                (v) => ({ label: v, value: v }),
              ),
            }),
          ],
          label: () =>
            h("label", [
              i18n.global.t("form.label.inputDateFormat"),
              h(
                ElTooltip,
                { effect: "dark" },
                {
                  content: () =>
                    h(
                      ElText,
                      { type: "info" },
                      {
                        default: () => [
                          i18n.global.t("toolTip.pleaseReferTo"),
                          h(
                            ElLink,
                            {
                              type: "primary",
                              href: "https://dayjs.gitee.io/docs/en/parse/string-format",
                              target: "_blank",
                            },
                            {
                              default: () => "dayjs",
                            },
                          ),
                        ],
                      },
                    ),
                  default: () => h(ElIcon, {}, () => h(InfoFilled)),
                },
              ),
            ]),
        },
      ),
      h(
        ElFormItem,
        {
          label: i18n.global.t("form.label.example"),
        },
        {
          default: () =>
            h(ElInput, {
              modelValue: formatExample.value,
              readonly: true,
              ["onUpdate:modelValue"]: () => {
                // do nothing
              },
            }),
        },
      ),
    ],
    separator: () => [
      h(
        ElFormItem,
        {
          label: i18n.global.t("form.label.separator"),
        },
        {
          default: () =>
            h(ElInput, {
              modelValue: configResult.value.separator,
              ["onUpdate:modelValue"]: (v: string) => {
                configResult.value.separator = v
              },
            }),
        },
      ),
    ],
    boolValue: () => [
      h(
        ElFormItem,
        {
          label: i18n.global.t("form.label.trueValue"),
        },
        {
          default: () =>
            h(ElSelectV2, {
              multiple: true,
              modelValue: configResult.value.boolValue?.true,
              ["onUpdate:modelValue"]: (v: string[]) => {
                //@ts-ignore
                configResult.value.boolValue.true = v
              },
              filterable: true,
              allowCreate: true,
              defaultFirstOption: true,
              options: defaultBoolValue.true.map((v) => ({
                label: v,
                value: v,
              })),
              style: "width: 100%",
            }),
        },
      ),
      h(
        ElFormItem,
        {
          label: i18n.global.t("form.label.falseValue"),
        },
        {
          default: () =>
            h(ElSelectV2, {
              multiple: true,
              modelValue: configResult.value.boolValue?.false,
              ["onUpdate:modelValue"]: (v: string[]) => {
                //@ts-ignore
                configResult.value.boolValue.false = v
              },
              filterable: true,
              allowCreate: true,
              defaultFirstOption: true,
              options: defaultBoolValue.false.map((v) => ({
                label: v,
                value: v,
              })),
              style: "width: 100%",
            }),
        },
      ),
    ],
    requestConfig: () => {
      const headers = ref<Array<[string, string]>>(
        configResult.value.requestConfig?.headers ?? [["", ""]],
      )
      watch(
        () => headers.value,
        (newVal) => {
          configResult.value.requestConfig!.headers = newVal
        },
        { deep: true },
      )
      const addHeader = () => {
        headers.value.push(["", ""])
      }
      const removeHeader = (index: number) => {
        headers.value.splice(index, 1)
      }
      return [
        h("h2", null, i18n.global.t("form.label.requestConfig")),
        h(
          ElFormItem,
          {
            label: i18n.global.t("form.label.requestMethod"),
          },
          {
            default: () =>
              h(ElSelectV2, {
                modelValue: configResult.value.requestConfig?.method,
                ["onUpdate:modelValue"]: (v: "GET" | "POST") => {
                  configResult.value!.requestConfig!.method = v
                },
                filterable: true,
                defaultFirstOption: true,
                options: [
                  {
                    label: "GET",
                    value: "GET",
                  },
                  {
                    label: "POST",
                    value: "POST",
                  },
                ],
                style: "width: 100%",
                disabled: true,
              }),
          },
        ),
        h("h3", null, [
          i18n.global.t("form.label.requestHeaders"),
          h(
            ElButton,
            {
              onClick: addHeader,
              type: "primary",
              style: "margin-left: 10px",
            },
            {
              default: () => h(ElIcon, {}, () => h(Plus)),
            },
          ),
        ]),
        h(ElFormItem, null, {
          default: () =>
            headers.value.map((v, i) =>
              h(
                ElRow,
                {
                  gutter: 10,
                  style: "margin-bottom: 5px",
                },
                {
                  default: () => [
                    h(ElInput, {
                      modelValue: v[0],
                      ["onUpdate:modelValue"]: (val: string) => {
                        v[0] = val
                      },
                      placeholder: "Key",
                      style: "width: 35%",
                    }),
                    h("span", null, ": "),
                    h(ElInput, {
                      modelValue: v[1],
                      ["onUpdate:modelValue"]: (val: string) => {
                        v[1] = val
                      },
                      placeholder: "Value",
                      style: "width: 35%",
                    }),
                    h(
                      ElButton,
                      {
                        onClick: () => removeHeader(i),
                        style: "margin-left: 10px",
                      },
                      {
                        default: () => h(ElIcon, {}, () => h(CloseBold)),
                      },
                    ),
                  ],
                },
              ),
            ),
        }),
      ]
    },
  }

  const formatExamples: {
    [key: number]: (format: string | string[]) => string
  } = {
    [FieldType.DateTime]: (format) => dayjs().format(format as string),
  }

  const formatList: { [key: number]: string[] } = {
    [FieldType.DateTime]: dateFormatList,
  }

  const refresh = () => {
    configResult.value = toValue(config) ?? {}
  }

  const allowConfig = ref(Object.keys(configFormItem))

  return {
    configList,
    configForm,
    allowConfig,
    refresh,
    configResult,
    render,
  }
}
