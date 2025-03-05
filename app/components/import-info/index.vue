<script lang="ts" setup>
import { ref } from "vue"
import { SuccessFilled, Loading, RemoveFilled } from "@element-plus/icons-vue"
import { useI18n } from "vue-i18n"
import { stages, currentStage, onStage, onStageEnd, beforeStage } from "./utils"
import { addLifeCircleEvent, importLifeCircles } from "@/utils/import"
import { ElMessage } from "element-plus"

Object.values(importLifeCircles).forEach((lifeCircle) => {
  if (lifeCircle.includes("before")) addLifeCircleEvent(lifeCircle, beforeStage)
  else if (lifeCircle.includes("End") && lifeCircle !== "onEnd")
    addLifeCircleEvent(lifeCircle, onStageEnd)
  else if (
    ![importLifeCircles.onStart, importLifeCircles.onEnd].includes(lifeCircle)
  )
    addLifeCircleEvent(lifeCircle, onStage)
})

addLifeCircleEvent(importLifeCircles.onStart, () => {
  refresh()
})

addLifeCircleEvent(importLifeCircles.onEnd, () => {
  toggleVisible()
  ElMessage.success(t("importInfo.importComplete"))
})

const { t } = useI18n()

const isVisible = ref(false)

function toggleVisible() {
  isVisible.value = !isVisible.value
}

function refresh() {
  stages.value = []
  currentStage.value = 0
  // isVisible.value = false
}

defineExpose({
  toggleVisible,
  refresh,
})
</script>

<template>
  <el-dialog
    v-model="isVisible"
    lock-scroll
    fullscreen
    accordion
  >
    <template #header> {{ t("importInfo.title") }} </template>
    <el-scrollbar height="70vh">
      <el-collapse v-model="currentStage">
        <el-collapse-item
          v-for="stage in stages"
          :key="stage.index"
          :name="stage.name"
          :disabled="stage.disabled"
        >
          <template #title>
            <el-icon
              v-show="stage.state === 'success'"
              color="var(--el-color-success)"
              size="20"
              ><SuccessFilled
            /></el-icon>
            <el-icon
              v-show="stage.state === 'loading'"
              size="20"
              class="is-loading"
              ><Loading
            /></el-icon>
            <el-icon
              v-show="stage.state === 'waiting'"
              size="20"
              ><RemoveFilled
            /></el-icon>
            {{ t("importInfo." + stage.title) }}
          </template>
          <el-progress
            v-if="stage.progress && stage.number"
            :percentage="((stage.success + stage.error) / stage.number) * 100"
            :striped="stage.success + stage.error < stage.number"
            striped-flow
          >
            <template #default>
              <span
                >{{ stage.success + stage.error }} / {{ stage.number }}</span
              >
            </template>
          </el-progress>
          <el-text type="success"
            >{{
              t("importInfo.success", { successNumber: stage.success ?? 0 })
            }},
          </el-text>
          <el-text
            type="danger"
            v-if="stage.error"
            >{{ t("importInfo.error", { errorNumber: stage.error ?? 0 }) }},
          </el-text>
          <el-text>{{
            t("importInfo.waiting", {
              waitingNumber: stage.number - (stage.success + stage.error) ?? 0,
            })
          }}</el-text
          ><br />
          <el-scrollbar
            v-if="stage.message"
            max-height="100px"
          >
            <pre style="text-wrap: wrap">{{ stage.message }}</pre>
          </el-scrollbar>
          <!-- <el-text>
            <pre>{{ stage.message }}</pre>
          </el-text> -->
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </el-dialog>
</template>
