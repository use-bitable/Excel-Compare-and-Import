import { TestItem } from "@/test/types"

export const barCodeTest: TestItem = {
  describe: "Test barCode",
  fieldMap: {
    key: "fldKQcB9zy",
    field: {
      id: "fldKQcB9zy",
      type: 99001,
      name: "条码",
      property: {
        onlyMobile: false,
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
    excel_field: "条码",
  },
  test: [
    {
      testTitle: 'Test barCode: "12345678901" => "12345678901"',
      value: "12345678901",
      normalized: "12345678901",
    },
  ],
}
