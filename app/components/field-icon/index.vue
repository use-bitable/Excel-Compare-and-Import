<script lang="ts" setup>
import { iconList } from "@/utils/fieldIcons"
import { FieldNameList, autoFields, notSupportFields } from "@/utils"
import { FieldType } from "@lark-base-open/js-sdk"
import { defineAsyncComponent, computed } from "vue"
import robotIcon from "@/components/icons/robot-icon.vue"
import notSupportIcon from "@/components/icons/notSupport-icon.vue"

const props = defineProps({
  type: {
    type: Number as () => FieldType,
    required: true,
  },
})

const icon = computed(() => {
  return defineAsyncComponent({
    loader: iconList[props.type],
  })
})
</script>

<template>
  <el-tooltip>
    <template #content>
      <span>{{ $t(`fieldType.${FieldNameList[type]}`) }}</span>
    </template>
    <el-icon>
      <Suspense>
        <icon />
      </Suspense>
    </el-icon>
  </el-tooltip>
  <el-tooltip v-if="autoFields.includes(type)">
    <template #content>
      {{ $t("toolTip.autoField") }}
    </template>
    <el-icon style="padding-left: 2px">
      <robotIcon />
    </el-icon>
  </el-tooltip>
  <el-tooltip v-if="notSupportFields.includes(type)">
    <template #content>
      {{ $t("toolTip.notSupportField") }}
    </template>
    <el-icon style="padding-left: 2px">
      <notSupportIcon />
    </el-icon>
  </el-tooltip>
</template>
