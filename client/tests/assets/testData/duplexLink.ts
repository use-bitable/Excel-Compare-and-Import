import { TestItem } from "@/test/types"

export const duplexLinkTest: TestItem = {
  describe: "Test duplexLink",
  fieldMap: {
    key: "fldfW6yZsr",
    field: {
      id: "fldfW6yZsr",
      type: 21,
      name: "双向关联",
      property: {
        tableId: "tbl8ZrlK3haHTHeM",
        multiple: false,
      },
      isPrimary: false,
      description: {
        disableSyncToFormDesc: false,
        content: null,
      },
    },
    table: "tblxarg8wkDhmjW1",
    config: {
      separator: ",",
    },
    root: true,
    hasChildren: true,
    children: [],
    writable: true,
    linkConfig: {
      allowAdd: false,
      primaryKey: "fldIYOcYVy",
    },
    excel_field: "双向关联",
  },
  test: [
    {
      testTitle:
        'Test duplexLink default separator(","): "recxxx,recxxx" => ["recxxx","recxxx"]',
      value: "recxxx,recxxx",
      normalized: ["recxxx", "recxxx"],
    },
  ],
}
