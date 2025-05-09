import { TestItem } from "@/test/types"

export const userTest: TestItem = {
  describe: "Test user",
  fieldMap: {
    key: "fldCnhFF9t",
    field: {
      id: "fldCnhFF9t",
      type: 11,
      name: "人员",
      property: {
        multiple: false,
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
    excel_field: "人员",
  },
  test: [
    {
      testTitle:
        'Test user default separator(","): "ou_xxx,ou_xxxx" => ["ou_xxx", "ou_xxxx"]',
      value: "ou_xxx,ou_xxxx",
      normalized: ["ou_xxx", "ou_xxxx"],
    },
    {
      testTitle:
        'Test user separator(";"): "ou_xxx;ou_xxxx" => ["ou_xxx", "ou_xxxx"]',
      value: "ou_xxx;ou_xxxx",
      normalized: ["ou_xxx", "ou_xxxx"],
      config: {
        separator: ";",
      },
    },
  ],
}
