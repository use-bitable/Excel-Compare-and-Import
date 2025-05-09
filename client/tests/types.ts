import type { fieldMap } from "@/types/types"

export interface TestData {
  testTitle: string
  value: string
  config?: fieldMap["config"]
  normalized: any
}

export interface TestItem {
  describe: string
  fieldMap: fieldMap
  test: TestData[]
}
