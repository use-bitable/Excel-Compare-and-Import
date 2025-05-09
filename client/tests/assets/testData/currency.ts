import { TestItem } from "@/test/types"

export const currencyTest: TestItem = {
  describe: "Test currency",
  fieldMap: {
    key: "fldTQFoxJ6",
    field: {
      id: "fldTQFoxJ6",
      type: 99003,
      name: "货币",
      property: {
        decimalDigits: 2,
        currencyCode: "CNY",
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
    excel_field: "货币",
  },
  test: [
    {
      testTitle: 'Test currency: "$1" => 1',
      value: "$1",
      normalized: 1,
    },
  ],
}
