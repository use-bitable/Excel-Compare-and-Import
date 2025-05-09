import { TestItem } from "@/test/types"

export const textTest: TestItem = {
  describe: "Test text",
  fieldMap: {
    key: "fldSHRqnpH",
    field: {
      id: "fldSHRqnpH",
      type: 1,
      name: "文本",
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
    excel_field: "文本",
  },
  test: [
    {
      testTitle: "Test text: text => text",
      value: "text",
      normalized: "text",
    },
  ],
}
