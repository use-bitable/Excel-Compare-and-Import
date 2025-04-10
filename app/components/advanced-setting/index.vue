<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { ref } from "vue"
import { useStorage } from "@vueuse/core"
import type { ImportOptions } from "@/types/types"
import { bitable } from "@lark-base-open/js-sdk"
import defaultOptions from "../../../plugin.config.json"

const userId = ref<string>(await bitable.bridge.getUserId())
const userOptions = useStorage<ImportOptions>(
  `Excel_Compare_and_import-${userId.value}`,
  defaultOptions,
  undefined,
  {
    mergeDefaults: true,
  },
)
const { t } = useI18n()
</script>

<template>
  <el-form>
    <h2>{{ t("advancedSetting.headIndex") }}</h2>
    <!-- <el-form-item :label="t('advancedSetting.fields')">
      <el-input-number
        v-model="userOptions!.parallel!.fields"
      ></el-input-number>
    </el-form-item> -->
    <el-form-item :label="t('advancedSetting.records')">
      <el-input-number
        size="small"
        :min="1"
        controls-position="right"
        v-model="userOptions!.headIndex"
      ></el-input-number>
    </el-form-item>
    <h2>{{ t("advancedSetting.parallel") }}</h2>
    <!-- <el-form-item :label="t('advancedSetting.fields')">
      <el-input-number
        v-model="userOptions!.parallel!.fields"
      ></el-input-number>
    </el-form-item> -->
    <el-form-item :label="t('advancedSetting.records')">
      <el-input-number
        size="small"
        controls-position="right"
        v-model="userOptions!.parallel!.records"
      ></el-input-number>
    </el-form-item>
    <h2>{{ t("advancedSetting.interval") }}</h2>
    <!-- <el-form-item :label="t('advancedSetting.fields')">
      <el-input-number
        v-model="userOptions!.interval!.fields"
      ></el-input-number>
    </el-form-item> -->
    <el-form-item :label="t('advancedSetting.records')">
      <el-input-number
        size="small"
        controls-position="right"
        v-model="userOptions!.interval!.records"
      ></el-input-number>
      ms
    </el-form-item>
  </el-form>
</template>
