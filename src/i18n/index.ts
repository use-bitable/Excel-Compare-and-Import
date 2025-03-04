import { createI18n } from "vue-i18n"
import { en } from "./en"
import { zh } from "./zh"
import { bitable } from "@lark-base-open/js-sdk"

export const i18n = createI18n({
  locale: "en",
  legacy: false,
  messages: {
    en: en,
    zh: zh,
  },
})

bitable.bridge.getLanguage().then((lang) => {
  i18n.global.locale.value = ["zh", "zh-TW", "zh-HK"].includes(lang)
    ? "zh"
    : "en"
})
