export enum importLifeCircles {
  onStart = "onStart",
  beforeReadFieldMap = "beforeReadFieldMap",
  onReadFieldMap = "onReadFieldMap",
  onReadFieldMapEnd = "onReadFieldMapEnd",
  beforeAnalyzeRecords = "beforeAnalyzeRecords",
  onAnalyzeRecords = "onAnalyzeRecords",
  onAnalyzeRecordsEnd = "onAnalyzeRecordsEnd",
  beforeAsyncData = "beforeAsyncData",
  onAsyncData = "onAsyncData",
  onAsyncDataEnd = "onAsyncDataEnd",
  beforeDeleteRecords = "beforeDeleteRecords",
  onDeleteRecords = "onDeleteRecords",
  onDeleteRecordsEnd = "onDeleteRecordsEnd",
  beforeAddRecords = "beforeAddRecords",
  onAddRecords = "onAddRecords",
  onAddRecordsEnd = "onAddRecordsEnd",
  beforeUpdateRecords = "beforeUpdateRecords",
  onUpdateRecords = "onUpdateRecords",
  onUpdateRecordsEnd = "onUpdateRecordsEnd",
  onEnd = "onEnd",
}

export interface lifeCircleEventParamData<T = any> {
  message?: {
    text: string
    params?: Record<string, string>
  }
  number?: number | Array<T>
  success?: number | Array<T>
  error?: number | Array<T>
  progress?: boolean
  [key: string]: any
}

export interface lifeCircleEventParams<T = any> {
  stage: string
  data?: lifeCircleEventParamData<T>
}

export type lifeCircleEvent = (e: lifeCircleEventParams) => Promise<void> | void

export type importLifeCircleEvents = {
  [key in importLifeCircles]: lifeCircleEvent[]
}

export const lifeCircleEvents: importLifeCircleEvents = Object.values(
  importLifeCircles,
).reduce((prev, cur) => {
  prev[cur] = []
  return prev
}, {} as importLifeCircleEvents)

export function addLifeCircleEvent(
  lifeCircle: importLifeCircles,
  callback: (e: any) => Promise<void> | void,
) {
  lifeCircleEvents[lifeCircle].push(callback)
}

export function removeLifeCircleEvent(
  lifeCircle: importLifeCircles,
  callback: (e: any) => Promise<void> | void,
) {
  const index = lifeCircleEvents[lifeCircle].indexOf(callback)
  if (index > -1) {
    lifeCircleEvents[lifeCircle].splice(index, 1)
  }
}

export function clearLifeCircleEvent(lifeCircle: importLifeCircles) {
  lifeCircleEvents[lifeCircle] = []
}

export function runLifeCircleEvent(
  lifeCircle: importLifeCircles,
  e: lifeCircleEventParams,
): void {
  if (lifeCircleEvents[lifeCircle].length === 0) return
  // Promise.all(lifeCircleEvents[lifeCircle].map((callback) => callback(e)))
  for (const callback of lifeCircleEvents[lifeCircle]) {
    callback(e)
  }
}
