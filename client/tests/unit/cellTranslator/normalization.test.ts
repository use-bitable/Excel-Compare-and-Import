import { describe, it, expect } from "vitest"
import { cellTranslator } from "@/utils/cellValue"
import { testData } from "../../assets/testData"

const testKey = Object.keys(testData)

for (const i of testKey) {
  const item = testData[Number(i)]
  describe(item.describe, async () => {
    for (const test of item.test) {
      it(test.testTitle, async () => {
        const { config } = test
        const result = await cellTranslator.normalization(
          test.value,
          item.fieldMap,
          config ?? item.fieldMap.config,
        )
        expect(result).toEqual(test.normalized)
      })
    }
  })
}
