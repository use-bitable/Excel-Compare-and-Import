import { TestItem } from "@/test/types"

export const modifiedTimeTest: TestItem = {
  describe: "Test modifiedTime",
  fieldMap: {
    key: "fld6sziIyW",
    field: {
      id: "fld6sziIyW",
      type: 1002,
      name: "最后更新时间",
      property: {
        dateFormat: "yyyy/MM/dd",
        displayTimeZone: false,
      },
      isPrimary: false,
      description: {
        disableSyncToFormDesc: false,
        content: null,
      },
    },
    table: "tblxarg8wkDhmjW1",
    config: {
      format: "YYYY/MM/DD",
    },
    root: true,
    hasChildren: false,
    children: [],
    writable: false,
    excel_field: "最后更新时间",
  },
  test: [
    {
      testTitle:
        'Test default format (YYYY/MM/DD): "2021/01/01" => 1609430400000',
      value: "2021/01/01",
      normalized: new Date("2021/01/01").getTime(),
    },
    {
      testTitle:
        'Test format (YYYY/MM/DD HH:mm:ss): "2021/01/01 00:00:00" => 1609430400000',
      value: "2021/01/01 00:00:00",
      normalized: new Date("2021/01/01 00:00:00").getTime(),
      config: {
        format: "YYYY/MM/DD HH:mm:ss",
      },
    },
  ],
}
