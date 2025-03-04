import type {
  IDuplexLinkFieldMeta,
  IFieldMeta,
  ISingleLinkFieldMeta,
  ITable,
  IField,
  IOpenCellValue,
} from "@lark-base-open/js-sdk"
import type { TaskAction } from "@/utils/import/tasks"

export interface SheetInfo {
  name: string
  tableData: {
    fields: {
      name: string
    }[]
    records: {
      [key: string]: string | null
    }[]
  }
}

export interface ExcelDataInfo {
  sheets: SheetInfo[]
  name: string
}

export interface IFieldValue {
  record_id: string
  value: IOpenCellValue
}

export interface IUndefinedFieldValue {
  record_id: undefined
  value: undefined
}

export type LinkField = ISingleLinkFieldMeta | IDuplexLinkFieldMeta

export type requestMethod = "GET" | "POST"

export interface fieldMap {
  /**
   * Key for tree node
   *
   * @Description The unique key of the node in a tree table
   */
  key: string
  field: IFieldMeta
  table: string
  excel_field: string | undefined
  root: boolean
  parent?: fieldMap
  writable: boolean
  config: {
    format?: string | string[]
    separator?: string
    boolValue?: {
      true: string[]
      false: string[]
    }
    requestConfig?: {
      method: requestMethod
      headers: Array<[string, string]>
      body: string
    }
  }
  linkConfig?: {
    allowAdd?: boolean
    primaryKey?: string
  }
  hasChildren: boolean
  children?: fieldMap[]
}

export interface BitableTable {
  table: ITable
  id: string
  name: string
  indexId: string[]
  primaryField: string
  root: boolean
  fields: {
    [key: string]: IField
  }
  fieldMaps: fieldMap[]
}

export enum TaskStatus {
  Wait = "wait",
  Running = "running",
  Success = "success",
  Error = "error",
  Cancel = "cancel",
}

export interface Task<T = any> {
  table: {
    name: string
    id: string
  }
  action: TaskAction
  status: TaskStatus
  data: Array<T>
  result: string | undefined | boolean
  link?: Array<Task>
  target?: Task
  recordId?: string
  asyncField?: fieldMap
  value?: string
  field?: IField
  index?: number
}

export enum importModes {
  append = "append",
  merge_direct = "merge_direct",
  compare_merge = "compare_merge",
}

export enum UpdateMode {
  SAVE_MOST = 0,
  SAVE_LEAST = 1,
  SAVE_OLDEST = 2,
  SAVE_LATEST = 3,
}

export interface ImportOptions {
  parallel?: {
    records: number
    fields: number
  }
  interval?: {
    records: number
    fields: number
  }
  allowAction?: {
    add: boolean
    update: boolean
    delete: boolean
  }
  updateOption?: {
    mode: UpdateMode[]
  }
}
