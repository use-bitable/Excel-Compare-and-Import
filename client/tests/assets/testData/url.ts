import { TestItem } from "@/test/types"

export const urlTest: TestItem = {
  describe: "Test url",
  fieldMap: {
    key: "fldvyneGxW",
    field: {
      id: "fldvyneGxW",
      type: 15,
      name: "超链接",
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
    excel_field: "超链接",
  },
  test: [
    {
      testTitle: 'Test url: "https://www.baidu.com" => "https://www.baidu.com"',
      value: "https://www.baidu.com",
      normalized: "https://www.baidu.com",
    },
  ],
}
