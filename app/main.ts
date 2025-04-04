import { i18n } from "./i18n/index"
import { Error } from "./utils"
import { createApp } from "vue"
import { createHead } from "@unhead/vue/client"
import App from "./App.vue"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"

const head = createHead()
const app = createApp(App)
app.config.errorHandler = (err, _, info) => {
  Error({
    title: "errorHandler",
    message: info,
    error: err,
  })
}
app.use(head).use(i18n).mount("#app")
