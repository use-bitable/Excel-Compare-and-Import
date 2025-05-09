import { TestItem } from "@/test/types"

export const phoneTest: TestItem = {
  describe: "Test phone",
  fieldMap: {
    key: "fldFkMRQMz",
    field: {
      id: "fldFkMRQMz",
      type: 13,
      name: "电话号码",
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
    excel_field: "电话号码",
  },
  test: [
    {
      testTitle: 'Test phone: "12345678901" => "12345678901"',
      value: "12345678901",
      normalized: "12345678901",
    },
  ],
}
