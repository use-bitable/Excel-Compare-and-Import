import { TestItem } from "@/test/types"

export const singleLinkTest: TestItem = {
  describe: "Test singleLink",
  fieldMap: {
    key: "fldaE40fkw",
    field: {
      id: "fldaE40fkw",
      type: 18,
      name: "单向关联",
      property: {
        tableId: "tbl8ZrlK3haHTHeM",
        multiple: true,
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
    excel_field: "单向关联",
  },
  test: [
    {
      testTitle:
        'Test singleLink default separator(","): "recxxx,recxxx" => ["recxxx","recxxx"]',
      value: "recxxx,recxxx",
      normalized: ["recxxx", "recxxx"],
    },
  ],
}
