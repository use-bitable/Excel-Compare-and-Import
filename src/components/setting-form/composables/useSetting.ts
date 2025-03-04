import { type MaybeRefOrGetter, toValue, ref, watch } from "vue"
import { type IFieldMeta, bitable } from "@lark-base-open/js-sdk"
import {
  type ExcelDataInfo,
  type fieldMap,
  type LinkField,
  type SheetInfo,
  importModes,
} from "@/types/types"
import { configField } from "../utils"
import {
  indexFieldType,
  autoFields,
  hasChildrenFieldType,
  Warn,
  // notSupportFields,
} from "@/utils"

async function loadFieldMaps(
  fields: IFieldMeta[],
  tableId: string,
  root = true,
  defaults?: fieldMap[],
): Promise<fieldMap[]> {
  return await Promise.all(
    fields.map(async (v) => {
      const hasChildren = hasChildrenFieldType.includes(v.type)
      let children: Array<fieldMap> = []
      let linkConfig: fieldMap["linkConfig"] = undefined
      if (hasChildren && root) {
        const linkTableId = (v as LinkField).property.tableId
        try {
          const linkTable = await bitable.base.getTable(linkTableId)
          const linkFields = await linkTable.getFieldMetaList()
          children = (
            await loadFieldMaps(linkFields, linkTableId, false)
          ).filter((i) => indexFieldType.includes(i.field.type))
          const defaultPrimaryKey = linkFields.filter((i) => i.isPrimary)[0]
          linkConfig = {
            // allowAdd: !(
            //   autoFields.includes(defaultPrimaryKey.type) ||
            //   notSupportFields.includes(defaultPrimaryKey.type)
            // ),
            /**
             * 暂时禁止向关联表添加值，待官方找到 bug
             */
            allowAdd: false,
            primaryKey: defaultPrimaryKey.id,
          }
        } catch (e) {
          Warn({
            message: `No permission of linked table ${linkTableId}, because of the link field ${v.name}[${v.id}]`,
            error: e,
            notice: true,
            noticeParams: {
              text: "message.noLinkedTableReadPermission",
              params: {
                tableId: linkTableId,
                fieldName: v.name,
                fieldId: v.id,
              },
            },
          })
          return null
        }
      }
      const defaultMap = defaults?.find((i) => i.field.id === v.id) ?? undefined
      return {
        key: v.id,
        field: v,
        table: tableId ?? "",
        excel_field: defaultMap ? defaultMap.excel_field : undefined,
        config:
          defaultMap && defaultMap.field.type === v.type
            ? defaultMap.config
            : configField(v.type),
        root: true,
        hasChildren,
        children,
        writable: !autoFields.includes(v.type),
        linkConfig,
      }
    }),
  ).then((res) => res.filter((i) => i !== null) as fieldMap[])
}

export function useSetting(
  tableFields: MaybeRefOrGetter<IFieldMeta[] | undefined>,
  excelData: MaybeRefOrGetter<ExcelDataInfo | undefined>,
  tableId: MaybeRefOrGetter<string | null>,
) {
  const mode = ref<importModes>(importModes.append)
  const settingColumns = ref<fieldMap[]>([])
  const sheetIndex = ref<number>(0)
  const excelFields = ref<SheetInfo["tableData"]["fields"]>([])
  const Index = ref<string[]>([])
  const pending = ref(false)
  function reset() {
    settingColumns.value = settingColumns.value.map((v) => {
      return {
        ...v,
        excel_field: undefined,
      }
    })
  }

  function fill() {
    if (!toValue(excelData) || !toValue(tableFields)) return
    const excelFieldsArray = toValue(excelFields).map((field) => field.name)
    settingColumns.value.forEach((column) => {
      if (excelFieldsArray.includes(column.field.name)) {
        column.excel_field = column.field.name
      }
      if (column.hasChildren && column.children) {
        column.children.forEach((child) => {
          if (excelFieldsArray.includes(child.field.name)) {
            child.excel_field = child.field.name
          }
        })
      }
    })
  }

  watch(
    () => toValue(excelData),
    (newVal) => {
      if (!newVal) {
        excelFields.value = []
        reset()
      } else {
        excelFields.value = newVal.sheets[sheetIndex.value].tableData.fields
        fill()
      }
    },
    { deep: true },
  )
  watch(sheetIndex, () => {
    const data = toValue(excelData)
    if (data) {
      excelFields.value = data.sheets[sheetIndex.value].tableData.fields
      fill()
    }
  })
  watch(
    () => toValue(tableFields),
    (newVal) => {
      if (!newVal) {
        settingColumns.value = []
        return
      }
      pending.value = true
      loadFieldMaps(
        newVal,
        toValue(tableId) as string,
        true,
        toValue(settingColumns),
      ).then((res) => {
        settingColumns.value = res
        pending.value = false
        if (toValue(excelData)) {
          fill()
        }
      })
    },
    { deep: true },
  )
  return {
    mode,
    reset,
    settingColumns,
    fill,
    sheetIndex,
    excelFields,
    Index,
    pending,
  }
}
