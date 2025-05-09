import { TestItem } from "@/test/types"

export const numberTest: TestItem = {
  describe: "Test number",
  fieldMap: {
    key: "fldu0xetcn",
    field: {
      id: "fldu0xetcn",
      type: 2,
      name: "数字",
      property: {
        formatter: "0.0",
      },
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
    excel_field: "数字",
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
