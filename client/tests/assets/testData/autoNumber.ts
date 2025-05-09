import { TestItem } from "@/test/types"

export const autoNumberTest: TestItem = {
  describe: "Test autoNumber",
  fieldMap: {
    key: "fldgkrkVub",
    field: {
      id: "fldgkrkVub",
      type: 1005,
      name: "自动编号",
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
    writable: false,
    excel_field: "自动编号",
  },
  test: [
    {
      testTitle: 'Test autoNumber: "1" => "1"',
      value: "1",
      normalized: "1",
    },
  ],
}
