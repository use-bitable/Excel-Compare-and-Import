import { TestItem } from "@/test/types"

export const formulaTest: TestItem = {
  describe: "Test formula",
  fieldMap: {
    key: "fldAr3hnDq",
    field: {
      id: "fldAr3hnDq",
      type: 20,
      name: "公式",
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
    excel_field: "公式",
  },
  test: [
    {
      testTitle: 'Test formula: "1" => "1"',
      value: "1",
      normalized: "1",
    },
  ],
}
