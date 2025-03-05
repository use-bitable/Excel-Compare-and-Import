<script lang="ts" setup>
import type { ExcelDataInfo } from "@/types/types"
import { ref, computed } from "vue"
import { useI18n } from "vue-i18n"
import type { RowClassNameGetter } from "element-plus"
const props = defineProps<{
  data: ExcelDataInfo | null | undefined
}>()
const curSheet = ref<number>(0)
const { t } = useI18n()

const options = computed(() => {
  return (
    props.data?.sheets.map((sheet, index) => ({
      label: sheet.name,
      value: index,
    })) ?? []
  )
})

const columns = computed(() => {
  if (!props.data) return []
  return props.data?.sheets[curSheet.value].tableData.fields.map((field) => ({
    title: field.name,
    width: 150,
    dataKey: field.name,
  }))
})

const rowClassGetter: RowClassNameGetter<{
  title: string
  width: number
  dataKey: string
}> = ({ rowIndex }) => {
  if (rowIndex % 2 === 0) return "stripped-row"
  return ""
}
</script>

<template>
  <el-form>
    <el-form-item :label="t('form.label.sheet')">
      <el-select-v2
        :options="options"
        v-model="curSheet"
      />
    </el-form-item>
  </el-form>
  <div style="height: 70vh">
    <el-auto-resizer>
      <template #default="{ width, height }">
        <el-table-v2
          :columns="columns"
          :data="data?.sheets[curSheet].tableData.records ?? []"
          :width="width"
          :height="height"
          :row-class="rowClassGetter"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<style>
.el-table-v2__row.stripped-row .el-table-v2__row-cell {
  background: var(--el-fill-color-lighter);
}

.el-table-v2__row.stripped-row:hover .el-table-v2__row-cell {
  background-color: var(--el-table-row-hover-bg-color);
}
</style>
