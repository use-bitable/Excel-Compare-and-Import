<script setup lang="ts">
import settingForm from "@/components/setting-form/index.vue"
import upload from "@/components/upload/index.vue"
import Info from "@/components/info/index.vue"
import runningLogger from "@/components/running-logger/index.vue"
import bugIcon from "@/components/icons/bug-icon.vue"
import advancedSetting from "@/components/advanced-setting/index.vue"
import { ref, onMounted, watch, nextTick } from "vue"
import { bitable, ThemeModeType } from "@lark-base-open/js-sdk"
import { useI18n } from "vue-i18n"
import { ElMessage, ElScrollbar } from "element-plus"
import { Link, QuestionFilled, Setting } from "@element-plus/icons-vue"
import type { ExcelDataInfo } from "@/types/types"
import { useHead } from "@unhead/vue"
import { useTheme } from "@qww0302/use-bitable"
import { Info as ConsoleInfo, setLogOptions } from "@/utils"
//@ts-ignore
import { default as Meta } from "virtual:meta"
import { useDark, useToggle } from "@vueuse/core"
import GithubIcon from "@/components/icons/github-icon.vue"
const isDark = useDark()
const showLogger = ref(false)
const showAdvancedSetting = ref(false)
const showReward = ref(false)

useHead({
  meta: [
    {
      name: "description",
      content: Meta.description,
    },
    {
      name: "keywords",
      content: String(Meta.keywords),
    },
    {
      name: "author",
      content: Meta.author.name,
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
  ],
})

const toggleLogger = useToggle(showLogger)
const toggleAdvancedSetting = useToggle(showAdvancedSetting)

const settingRef = ref()
const uploadRef = ref()
const { t } = useI18n()

setLogOptions({
  onError: (msg) => {
    const { notice, noticeParams } = msg
    if (notice && noticeParams) {
      ElMessage({
        message: t(noticeParams.text, noticeParams?.params ?? {}),
        type: "error",
        grouping: true,
        duration: 3000,
      })
    }
  },
  onWarn: (msg) => {
    const { notice, noticeParams } = msg
    if (notice && noticeParams) {
      ElMessage({
        message: t(noticeParams.text, noticeParams?.params ?? {}),
        type: "warning",
        grouping: true,
        duration: 3000,
      })
    }
  },
})

useTheme({
  onChanged: (theme) => {
    isDark.value = theme === ThemeModeType.DARK
  },
})
const data = ref<ExcelDataInfo>()
const isActive = ref(false)

watch(
  () => uploadRef.value?.data,
  (newVal) => {
    data.value = newVal
  },
  { deep: true },
)

watch(
  () => settingRef.value?.isActive,
  (newVal) => {
    isActive.value = newVal
  },
)
const scrollRef = ref<InstanceType<typeof ElScrollbar>>()
const onImported = () => {
  showReward.value = true
  console.log(scrollRef.value, scrollRef.value?.$el.clientHeight)
  nextTick(() => {
    scrollRef.value?.scrollTo(0, parseFloat(scrollRef.value?.$el.clientHeight))
  })
}

onMounted(async () => {
  const theme = await bitable.bridge.getTheme()
  isDark.value = theme === ThemeModeType.DARK
  ConsoleInfo({
    title: "UserAgent",
    message: navigator.userAgent,
  })
})
</script>

<template>
  <el-scrollbar
    id="plugin-wrap"
    ref="scrollRef"
    height="100vh"
  >
    <div
      ref="wrapRef"
      style="padding: 10px"
    >
      <el-row justify="space-between">
        <el-link
          target="_blank"
          href="https://ct8hv7vfy1.feishu.cn/docx/EOALdRssWoxksuxy7gucmECQnEc"
        >
          <el-icon>
            <Link />
          </el-icon>
          {{ t("guide") }}
        </el-link>
        <span>
          <!-- <el-link
          v-if="isSupported"
          type="primary"
          @click="toggle"
        >
          <el-icon><FullScreen /></el-icon>
        </el-link> -->
          <el-tooltip>
            <template #content>
              <span>{{ t("advancedSetting.advancedSetting") }}</span>
            </template>
            <el-link
              v-if="!isActive"
              type="primary"
              @click="toggleAdvancedSetting()"
            >
              <el-icon><Setting /></el-icon>
            </el-link>
          </el-tooltip>
          <el-tooltip>
            <template #content>
              <span>{{ t("toolTip.log") }}</span>
            </template>
            <el-link @click="toggleLogger()">
              <el-icon><bugIcon /></el-icon>
            </el-link>
          </el-tooltip>
          <el-tooltip>
            <template #content>
              <span>{{ t("toolTip.questions") }}</span>
            </template>
            <el-link
              target="_blank"
              href="https://ct8hv7vfy1.feishu.cn/docx/EOALdRssWoxksuxy7gucmECQnEc#GOqRdJLfmoZsnWxuUvscair3nRe"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-link>
          </el-tooltip>
          <el-tooltip>
            <template #content>
              <span>Github</span>
            </template>
            <el-link
              target="_blank"
              href="https://github.com/zjut-bio-party-undergraduate-branch/Excel-Compare-and-Import"
            >
              <el-icon><GithubIcon /></el-icon>
            </el-link>
          </el-tooltip>
          <el-tooltip>
            <template #content>
              <span>{{ t("toolTip.about") }}</span>
            </template>
            <span>
              <Info />
            </span>
          </el-tooltip>
        </span>
      </el-row>
      <upload ref="uploadRef" />
      <Suspense>
        <setting-form
          ref="settingRef"
          :excelData="data"
          :onImported="onImported"
        />
      </Suspense>
      <el-row
        justify="center"
        style="margin-top: 20px; padding-bottom: 50px"
        v-show="showReward"
      >
        <Reward
          ref="rewardRef"
          qrCode="https://s1.imagehub.cc/images/2024/09/27/e0dffe8162034e5614f5665e10e262ff.jpg"
          :author="Meta.author.name"
        />
      </el-row>
    </div>
  </el-scrollbar>
  <el-dialog
    v-model="showLogger"
    fullscreen
    lock-scroll
    :title="t('toolTip.log')"
  >
    <running-logger />
  </el-dialog>
  <el-dialog
    v-model="showAdvancedSetting"
    fullscreen
    lock-scroll
    :title="t('advancedSetting.advancedSetting')"
  >
    <el-scrollbar max-height="70vh">
      <Suspense>
        <advancedSetting />
      </Suspense>
    </el-scrollbar>
  </el-dialog>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
