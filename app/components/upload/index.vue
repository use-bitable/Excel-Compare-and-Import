<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue"
import { Upload, Close } from "@element-plus/icons-vue"
import { genFileId, ElMessage } from "element-plus"
import type { UploadInstance, UploadFile, UploadRawFile } from "element-plus"
import type { ExcelDataInfo, ImportOptions } from "@/types/types"
import { useI18n } from "vue-i18n"
import uploadIcon from "@/components/icons/upload-icon.vue"
import excelIcon from "@/components/icons/excel-icon.vue"
import { useFileReader } from "@qww0302/use-bitable"
import { Error } from "@/utils"
import viewXLSX from "@/components/view-xlsx/index.vue"
import { readXLSX } from "./readXLSX"
import { useStorage } from "@vueuse/core"
import { bitable } from "@lark-base-open/js-sdk"
import defaultOptions from "../../../plugin.config.json"
import { handleExcelDataInfo } from "@/utils/excelMedia"

const showView = ref(false)
function toggleShowView() {
  showView.value = !showView.value
}

const upload = ref<UploadInstance>()
const { t } = useI18n()
const excelFile = ref<File | null>(null)
const userId = ref<string>()
const userOptions = ref<ReturnType<typeof useStorage<ImportOptions>>>()

watchEffect(() => {
  if (userId.value) {
    userOptions.value = useStorage<ImportOptions>(
      `Excel_Compare_and_import-${userId.value}`,
      defaultOptions,
      undefined,
      {
        mergeDefaults: true,
      },
    )
  }
})

const { data, pending, name } = useFileReader<ExcelDataInfo | null>(excelFile, {
  load: async (data, resolve) => {
    const headIndex = userOptions.value?.value.headIndex
    if (typeof Worker === "undefined") {
      try {
        const _data = await readXLSX(data, (excelFile.value as File).name, {
          headIndex,
          onError: ({ message, payload, error }) => {
            Error({
              title: message,
              message: t(message, payload),
              notice: true,
              noticeParams: {
                text: message,
                params: payload,
              },
              error,
            })
          },
        })
        if (_data === null) excelFile.value = null
        handleExcelDataInfo(_data)
        resolve(_data)
      } catch (e) {
        Error({
          title: "readError",
          message: "readError",
          notice: true,
          noticeParams: {
            text: "readError",
          },
          error: e,
        })
      }
    } else {
      const worker = (await import("./readXLSX.worker.ts?worker")).default
      const reader = new worker()
      reader.onmessage = (e) => {
        const { data } = e
        const { type, payload } = data
        if (type === "readXLSX") {
          if (payload === null) excelFile.value = null
          handleExcelDataInfo(payload)
          resolve(payload)
          reader.terminate()
        }
        if (type === "error") {
          const { message, payload: params } = payload
          Error({
            title: message,
            message: t(message, params),
            notice: true,
            noticeParams: {
              text: message,
              params,
            },
          })
        }
      }
      reader.postMessage({
        payload: { data, name: excelFile.value?.name, headIndex },
        type: "readXLSX",
      })
    }
  },
  shallow: true,
})

onMounted(async () => {
  console.log(t("onMounted"))
  userId.value = await bitable.bridge.getUserId()
})

function getFile(file: UploadFile) {
  if (!/\.(xlsx|xls|csv|xlsm)?$/.test(file.name)) {
    ElMessage.error(t("message.fileType"))
    Error({
      title: "message.fileType",
      message: "message.fileType",
      notice: true,
      noticeParams: {
        text: "message.fileType",
      },
    })
    return
  }
  excelFile.value = file.raw as File
}

function exceedHandler(files: File[]): void {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

function closeFileCard(): void {
  excelFile.value = null
  upload.value!.clearFiles()
}

defineExpose({
  data,
})
</script>

<template>
  <h3>
    <el-icon>
      <Upload />
    </el-icon>
    {{ t("h.upload") }}
  </h3>
  <el-upload
    v-show="!excelFile"
    ref="upload"
    drag
    :on-change="getFile"
    accept=".xls,.xlsx,.csv,.xlsm"
    :limit="1"
    :auto-upload="false"
    :on-exceed="exceedHandler"
    :show-file-list="false"
  >
    <KeepAlive>
      <el-icon
        color="#2962f1"
        size="30"
        class="el-icon--upload"
      >
        <uploadIcon style="color: var(--color)" />
      </el-icon>
    </KeepAlive>

    <div class="el-upload__text">
      <el-text>{{ t("upload.tip.common") }}</el-text>
    </div>
    <div class="el-upload__text">
      <el-text size="small">{{ t("upload.tip.fileSupport") }}</el-text>
    </div>
  </el-upload>
  <el-card
    v-loading="pending"
    v-show="excelFile"
    shadow="hover"
  >
    <el-row>
      <el-col :span="4">
        <el-icon size="2em">
          <excelIcon />
        </el-icon>
      </el-col>
      <el-col :span="18">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          "
        >
          <el-auto-resizer style="display: flex">
            <template #default="{ width }">
              <el-tooltip>
                <template #content>
                  <span>{{ t("toolTip.clickToPreview", { name }) }}</span>
                </template>
                <el-text
                  class="file-name"
                  @click="toggleShowView"
                  :style="{
                    width: width - 50 + 'px',
                    cursor: 'pointer',
                  }"
                  truncated
                  >{{ name }}</el-text
                >
              </el-tooltip>
            </template>
          </el-auto-resizer>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button
          text
          @click="closeFileCard"
        >
          <el-icon>
            <close />
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-dialog
    v-model="showView"
    fullscreen
  >
    <viewXLSX :data="data" />
  </el-dialog>
</template>
<style scoped>
.file-name:hover {
  text-decoration: underline;
}
</style>
