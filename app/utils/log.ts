import { ref } from "vue"

export type LogOptions = {
  prefix: string
  onError?: (msg: Message) => void
  onWarn?: (msg: Message) => void
  onInfo?: (msg: Message) => void
  onLog?: (msg: Message) => void
}

interface NoticeParams {
  text: string
  params?: Record<string, string>
}

export type Message = {
  title?: string
  message: string
  error?: any
  notice?: boolean
  noticeParams?: NoticeParams
}

export type LogItem = {
  type: "info" | "warn" | "error" | "log"
  message: Message
  time: number
  file?: string
  line?: number
}

export const log = ref<LogItem[]>([])

export const options = ref<LogOptions>({
  prefix: "[Excel Compare and Import] ",
})

export function setLogOptions(newOptions: Partial<LogOptions>) {
  options.value = {
    ...options.value,
    ...newOptions,
  }
}

const _console = console

export const useLog =
  <T extends LogItem["type"]>(type: T) =>
  (msg: Message) => {
    const cache = {
      type: type,
      message: msg,
      time: Date.now(),
    }
    log.value.push(cache)
    const action = _console[type] ?? _console.log
    action.apply(void 0, [
      options.value.prefix + msg.title + ": ",
      msg.message,
      msg.error ?? "",
    ])

    if (type === "error") {
      options.value.onError?.(msg)
    }

    if (type === "warn") {
      options.value.onWarn?.(msg)
    }

    if (type === "info") {
      options.value.onInfo?.(msg)
    }

    if (type === "log") {
      options.value.onLog?.(msg)
    }
  }

export const Log = useLog("log")
export const Info = useLog("info")
export const Warn = useLog("warn")
export const Error = useLog("error")
