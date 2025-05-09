import { TestItem } from "@/test/types"

export const progressTest: TestItem = {
  describe: "Test progress",
  fieldMap: {
    key: "fldSCvzgxh",
    field: {
      id: "fldSCvzgxh",
      type: 99002,
      name: "进度",
      property: null,
      isPrimary: false,
      description: {
        disableSyncToFormDesc: false,
        content: null,
      },
    },
    table: "tblxarg8wkDhmjW1",
    config: {},
    root: true,
    hasChildren: false,
    children: [],
    writable: true,
    excel_field: "进度",
  },
  test: [
    {
      testTitle: 'Test int number: "1" => 1',
      value: "1",
      normalized: 1,
    },
    {
      testTitle: 'Test float number: "1.1" => 1.1',
      value: "1.1",
      normalized: 1.1,
    },
    {
      testTitle: 'Test percentage: "10%" => 0.1',
      value: "10%",
      normalized: 0.1,
    },
  ],
}
