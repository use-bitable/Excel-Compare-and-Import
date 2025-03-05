<script lang="ts" setup>
import { ref, watch, computed } from "vue"
import { useI18n } from "vue-i18n"
import type { fieldMap, LinkField } from "@/types/types"
import { useFieldConfig } from "@/composables/useFieldConfig"
import { FieldType } from "@lark-base-open/js-sdk"
import { useTable } from "@qww0302/use-bitable"
import { autoFields, notSupportFields } from "@/utils"
// import { ElMessage } from "element-plus"
import fieldIcon from "@/components/field-icon/index.vue"

const props = defineProps({
  field: {
    type: Object as () => fieldMap,
  },
})

const isVisible = ref(false)
const { t } = useI18n()
const config = ref<fieldMap["config"]>()
const canAdd = ref(true)
const primaryKey = ref<string>()
const primaryType = ref<FieldType>()
const linkTableId = ref<string | null>(null)
const linkTableName = ref<string | null>(null)
const primaryField = ref<fieldMap>()
const canAddSetAble = ref(true)
const namePending = ref(false)
const nameCache = ref<Record<string, string>>({})

const { table: linkTable, pending } = useTable(linkTableId)

watch(
  () => linkTable.value,
  () => {
    if (!linkTable.value) return
    const id = linkTable.value.id
    if (nameCache.value[id]) {
      linkTableName.value = nameCache.value[id]
      return
    }
    namePending.value = true
    linkTable.value.getName().then((res) => {
      linkTableName.value = res
      nameCache.value[id] = res
      namePending.value = false
    })
  },
)
const options = computed(
  () =>
    props.field?.children?.map((field) => {
      return {
        label: field.field.name,
        value: field.field.id,
        type: field.field.type,
      }
    }) ?? [],
)

const { configForm, configResult } = useFieldConfig(config, primaryType, [
  "separator",
])

function refresh() {
  primaryKey.value = props.field?.linkConfig?.primaryKey ?? ""
  /**
   * 待官方找到 bug
   */
  // canAdd.value = props.field?.linkConfig?.allowAdd ?? true
  canAdd.value = false
  linkTableId.value = (props.field?.field as LinkField).property?.tableId
}

watch(
  () => props.field,
  () => {
    refresh()
  },
  { deep: true },
)

function refreshType(id: string) {
  const map = props.field?.children?.find((field) => field.field.id === id)
  if (!map) return
  primaryField.value = map
  config.value = map.config
  primaryType.value = map.field.type
}

watch(
  () => primaryType.value,
  (newVal) => {
    if (!newVal) return
    if (autoFields.includes(newVal) || notSupportFields.includes(newVal)) {
      canAdd.value = false
      canAddSetAble.value = false
      return
    }
  },
)

watch(
  () => primaryKey.value,
  (newVal) => {
    if (!newVal) return
    refreshType(newVal)
    console.log("config", config.value)
  },
)

const emits = defineEmits<{
  (
    e: "confirmSetting",
    linkConfig: fieldMap["linkConfig"],
    config: fieldMap["config"],
  ): void
}>()

function validate(id: string) {
  refreshType(id)
  /**
   * 待官方找到 bug
   */
  // if (!primaryType.value) return
  // if (autoFields.includes(primaryType.value)) {
  //   canAdd.value = false
  //   canAddSetAble.value = false
  //   ElMessage({
  //     message: t("message.autoFieldNotAllowAdd"),
  //     type: "warning",
  //     grouping: true,
  //   })
  //   return
  // }
  // if (notSupportFields.includes(primaryType.value)) {
  //   canAdd.value = false
  //   canAddSetAble.value = false
  //   ElMessage({
  //     message: t("message.notSupportFieldNotAllowAdd"),
  //     type: "warning",
  //     grouping: true,
  //   })
  //   return
  // }
  // canAddSetAble.value = true
  // canAdd.value = true
}

function confirm() {
  emits(
    "confirmSetting",
    {
      allowAdd: canAdd.value,
      primaryKey: primaryKey.value,
    },
    JSON.parse(JSON.stringify(configResult.value)),
  )
  toggleVisible()
}
function toggleVisible() {
  isVisible.value = !isVisible.value
}

defineExpose({
  toggleVisible,
  isVisible,
})
</script>

<template>
  <el-dialog
    v-model="isVisible"
    lock-scroll
    width="75%"
    :title="t('h.setLink')"
    fullscreen
    @close="refresh"
  >
    <el-scrollbar max-height="55vh">
      <el-form style="padding: 10px">
        <el-form-item :label="t('form.label.linkTable') + ':'">
          <span>{{
            namePending || pending ? "Loading...." : linkTableName
          }}</span>
        </el-form-item>
        <el-form-item :label="t('form.label.primaryKey')">
          <el-select
            v-model="primaryKey"
            @change="validate"
            placement="right"
          >
            <el-option
              v-for="item of options"
              :value="item.value"
              :label="item.label"
            >
              <template #default>
                <span style="margin-right: 5px; position: relative; right: 0px">
                  <fieldIcon :type="item.type" />
                </span>
                <span style="user-select: none">{{ item.label }}</span>
              </template>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item :label="t('form.label.allowAdd')">
          <el-switch
            :disabled="!canAddSetAble"
            v-model="canAdd"
          ></el-switch>
        </el-form-item> -->
        <component :is="configForm" />
      </el-form>
    </el-scrollbar>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isVisible = false">{{
          t("button.cancel")
        }}</el-button>
        <el-button
          type="primary"
          @click="confirm()"
          >{{ t("button.confirm") }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
