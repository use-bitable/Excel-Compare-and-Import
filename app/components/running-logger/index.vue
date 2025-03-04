<script setup lang="ts">
import { log } from "@/utils"
import { computed, h, ref } from "vue"
import { type RowClassNameGetter, type Column, ElTag } from "element-plus"
import ExportIcon from "@/components/icons/export-icon.vue"
import { downLoadFileFromA } from "@/utils"
// import { useFileSystemAccess } from "@vueuse/core"

// const {
//   isSupported,
//   data: exportData,
//   saveAs,
// } = useFileSystemAccess()
const showType = ref<("info" | "log" | "error" | "warn")[]>([
  "error",
  "warn",
  "info",
])

const tagType: Record<string, "info" | "danger" | "warning" | "success"> = {
  log: "info",
  error: "danger",
  warn: "warning",
  info: "info",
}
const columns: Column[] = [
  {
    title: "Type",
    width: 150,
    dataKey: "type",
    key: "type",
    align: "center",
    cellRenderer: ({ cellData: type }) => {
      return h(
        ElTag,
        {
          type: tagType[type],
        },
        {
          default: () => h("span", null, type),
        },
      )
    },
  },
  {
    title: "Title",
    width: 150,
    dataKey: "message.title",
    align: "center",
  },
  {
    title: "Time",
    width: 150,
    dataKey: "time",
    align: "center",
    cellRenderer: ({ cellData: time }) => {
      return h("span", null, new Date(time).toLocaleString())
    },
  },
]
const rowClassGetter: RowClassNameGetter<{
  title: string
  width: number
  dataKey: string
}> = ({ rowIndex }) => {
  if (rowIndex % 2 === 0) return "stripped-row"
  return ""
}

const data = computed(() => {
  return log.value
    .filter((item) => {
      return showType.value.includes(item.type)
    })
    .map((item, index) => {
      const children = [
        {
          detail: item.message.message,
          id: `${index}-detail-content`,
          error: item.message.error,
        },
      ]
      return {
        ...item,
        id: index,
        parentId: null,
        children,
      }
    })
})

//@ts-ignore
const Row = ({ cells, rowData }) => {
  if (rowData.detail)
    return h(
      "div",
      {
        style: "padding: 1.5rem;",
      },
      [
        h(
          "pre",
          {
            style: "wite-space: pre-wrap;",
          },
          rowData.detail,
        ),
        h(
          "pre",
          {
            style: "wite-space: pre-wrap;",
          },
          rowData.error
            ? JSON.stringify(
                rowData.error,
                Object.getOwnPropertyNames(rowData.error),
                2,
              )
            : "",
        ),
      ],
    )
  return cells
}

const saveLog = () => {
  const logString = JSON.stringify(data.value, null, 2)
  downLoadFileFromA(
    `data:text/json;charset=utf-8,${encodeURIComponent(logString)}`,
    `Excel_Compare_and_Import_Log_${Date.now()}.json`,
  )
}

Row.inheritAttrs = false
</script>

<template>
  <el-scrollbar max-height="90vh">
    <div style="display: flex">
      <el-checkbox-group v-model="showType">
        <el-checkbox label="log" />
        <el-checkbox label="info" />
        <el-checkbox label="warn" />
        <el-checkbox label="error" />
      </el-checkbox-group>
      <el-tooltip>
        <template #content>
          <span>Export</span>
        </template>
        <el-button
          @click="saveLog"
          type="primary"
          style="margin-left: 10px"
        >
          <el-icon><ExportIcon /></el-icon>
        </el-button>
      </el-tooltip>
    </div>

    <el-auto-resizer style="height: 70vh">
      <template #default="{ width, height }">
        <el-table-v2
          :columns="columns"
          :data="data"
          :width="width"
          :height="height"
          :row-class="rowClassGetter"
          :expand-column-key="columns[0].key"
          fixed
          :estimated-row-height="50"
        >
          <template #row="props">
            <Row v-bind="props" />
          </template>
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </el-scrollbar>
</template>

<style>
.el-table-v2__row.stripped-row .el-table-v2__row-cell {
  background: var(--el-fill-color-lighter);
}

.el-table-v2__row.stripped-row:hover .el-table-v2__row-cell {
  background-color: var(--el-table-row-hover-bg-color);
}

.el-table-v2__row-depth-0 {
  height: 50px;
}

.el-table-v2__cell-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
