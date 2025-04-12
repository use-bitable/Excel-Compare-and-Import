import {
  type IAttachmentField,
  FieldType,
  bitable,
  UploadFileTaskStatus,
  type IOpenAttachment,
} from "@lark-base-open/js-sdk"
import { defineTranslator, type AsyncParams, FieldRole } from "./cell"
import { downLoadFile, unique, validateUrl } from "@/utils"
import type { fieldMap } from "@/types/types"

enum DownloadStatus {
  Waiting = -1,
  Downloading = 0,
  Downloaded = 200,
  Error = 404,
}

interface FileCacheItem {
  url: string
  file: File | null
  name: string
  total: number
  loaded: number
  status: DownloadStatus
  token: string
  timeStamp: number
}

let cache: Record<string, FileCacheItem> = {}
let mobileCache: Record<
  string,
  {
    isOnlyMobile: boolean
    field: IAttachmentField
  }
> = {}

const setCache = (item: FileCacheItem | Array<FileCacheItem>) => {
  if (Array.isArray(item)) {
    item.forEach((i) => {
      cache[i.url] = i
    })
    return
  }
  cache[item.url] = item
}

/**
 * Download files
 *
 * @param urls
 * @param options
 * @returns
 */
function processDownloadFiles(
  urls: Array<string>,
  options?: {
    onProgress?: AsyncParams<string>["onProgress"]
    onError?: AsyncParams<string>["onError"]
    parallel?: number
    requestConfig?: fieldMap["config"]["requestConfig"]
  },
) {
  const { onProgress, parallel = 4, onError } = options ?? {}
  const cacheItems = unique(urls)
    .map((url) => {
      if (!validateUrl(url) && !url.startsWith("blob:")) {
        onError?.(new Error("Invalid url: " + url))
        return
      }
      const item =
        cache[url] ||
        ({
          url,
          file: null,
          name: "",
          total: 0,
          loaded: 0,
          status: DownloadStatus.Waiting,
          token: "",
        } as FileCacheItem)
      return item
    })
    .filter((item) => {
      return (
        item &&
        [DownloadStatus.Waiting, DownloadStatus.Error].includes(item.status)
      )
    }) as Array<FileCacheItem>
  if (!cacheItems.length) return
  setCache(cacheItems)
  const total = cacheItems.length
  let loaded = 0
  let runningNum = 0
  const pendingItems: Array<FileCacheItem> = []
  const _run = () => {
    while (runningNum < parallel && cacheItems.length) {
      const item = cacheItems.shift()
      if (!item) return
      item.status = DownloadStatus.Downloading
      runningNum++
      pendingItems.push(item)
      downLoadFile(item.url, {
        onProgress: (p) => {
          item.loaded = p.loaded
          item.total = p.total
          onProgress?.({
            total,
            loaded,
            message: pendingItems
              .map(
                (i) =>
                  `Downloading ${i.url} ${((i.loaded / i.total) * 100).toFixed(
                    2,
                  )}%`,
              )
              .join("\n"),
          })
        },
        fetchOptions: options?.requestConfig,
      })
        .then((file) => {
          item.file = file
          item.name = file?.name ?? ""
          item.status = DownloadStatus.Downloaded
        })
        .catch((e) => {
          item.status = DownloadStatus.Error
          onError?.(e)
        })
        .finally(() => {
          runningNum--
          loaded++
          pendingItems.splice(pendingItems.indexOf(item), 1)
          _run()
        })
    }
  }
  return new Promise((resolve) => {
    _run()
    const timer = setInterval(() => {
      if (!cacheItems.length) {
        clearInterval(timer)
        resolve(null)
      }
    }, 1000)
  })
}

async function normalization(value: string, config?: fieldMap["config"]) {
  if (!value) return null
  const { separator = "," } = config || {}
  const urls = value.split(separator)
  return urls
}

async function attachment(value: string, field: IAttachmentField) {
  const urls = await normalization(value)
  const mobileCacheItem = mobileCache[field.id]
  if (mobileCacheItem === undefined) {
    const cur = await field.getOnlyMobile()
    mobileCache[field.id] = {
      isOnlyMobile: cur,
      field,
    }
    if (cur) {
      await field.setOnlyMobile(false)
    }
  }
  if (!urls || !urls.length) return null
  const files = urls
    .map((url) => {
      const item = cache[url]
      if (!item || !item.token) return null
      return {
        name: item.name,
        token: item.token,
        size: item.total,
        type: item.file?.type ?? "",
        timeStamp: new Date().getTime(),
      }
    })
    .filter(Boolean) as IOpenAttachment[]
  if (!files.length) return null
  return await field.createCell(files)
}

export const AttachmentTranslator = defineTranslator({
  fieldType: FieldType.Attachment,
  translate: attachment,
  normalization,
  name: "Attachment",
  asyncMethod: async (
    options: AsyncParams<string>,
    config?: fieldMap["config"],
  ) => {
    const { data: _urls, onProgress, onError } = options
    const { requestConfig } = config || {}
    if (!_urls.length) return
    const urls = _urls.map((i) => {
      if (Array.isArray(i)) {
        return i.join(",")
      } else {
        return i
      }
    })
    await processDownloadFiles(urls, { onProgress, onError, requestConfig })
    const hasFileItems = Object.values(cache).filter((item) => item.file)
    const files = hasFileItems
      .map((item) => item.file)
      .filter(Boolean) as File[]
    const off = bitable.base.onUploadStatusChange(({ data }) => {
      const { tasks } = data
      const { list } = tasks
      onProgress?.({
        loaded: list.filter((t) => t.status === UploadFileTaskStatus.Success)
          .length,
        total: list.length,
        message: list
          .filter((t) => t.status === UploadFileTaskStatus.Pending)
          .map(
            (t) =>
              `Uploading ${t.name} ${((t.uploadedSize / t.size) * 100).toFixed(
                2,
              )}`,
          )
          .join("\n"),
      })
    })
    if (!files.length) return
    const tokens = await bitable.base.batchUploadFile(files)
    let index = 0
    const items = Object.values(hasFileItems)
    for (const t in items) {
      const item = items[t]
      if (!item.file) continue
      item.token = tokens[index]
      index += 1
    }
    off()
  },
  roles: [FieldRole.ASYNC],
  refresh: () => {
    cache = {}
    mobileCache = {}
  },
  reset: () => {
    const items = Object.values(mobileCache)
    for (const t in items) {
      const item = items[t]
      item.field.setOnlyMobile(item.isOnlyMobile)
    }
  },
})
