import { ref } from "vue"
import { lifeCircleEventParams } from "@/utils/import/lifeCircle"
import { Task } from "@/types/types"
import { i18n } from "@/i18n"

export interface stage {
  state: string
  disabled: boolean
  message: string
  progress: boolean
  stage: string
  success: number
  error: number
  number: number
  name: string | number
  title: string
  index: number
}

export const currentStage = ref(0)

export const stages = ref<stage[]>([])

export function beforeStage(params: lifeCircleEventParams<Task>) {
  const { stage, data } = params
  const { progress = false, success = 0, error = 0, number = 0 } = data || {}
  const index = stages.value.length
  stages.value.push({
    progress,
    state: "loading",
    index,
    title: stage,
    disabled: false,
    stage,
    name: index,
    number: Array.isArray(number) ? number.length : number,
    success: Array.isArray(success) ? success.length : success,
    error: Array.isArray(error) ? error.length : error,
    message: "",
  })
  currentStage.value = index
}

export function onStage(params: lifeCircleEventParams<Task>) {
  const { stage, data } = params
  const { success = 0, error = 0, message } = data || {}
  const stageItem = stages.value[currentStage.value]
  if (stage !== stageItem.stage) return
  if (success) {
    stageItem.success += typeof success === "number" ? success : success.length
  }
  if (error) {
    stageItem.error += typeof error === "number" ? error : error.length
  }
  if (message) {
    stageItem.message = i18n.global.t(message.text, message.params ?? {})
  }
}

export function onStageEnd(params: lifeCircleEventParams<Task>) {
  const { stage } = params
  const stageItem = stages.value[currentStage.value]
  if (stage !== stageItem.stage) return
  stageItem.progress = false
  stageItem.disabled = true
  stageItem.state = "success"
}
