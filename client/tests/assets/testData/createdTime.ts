import { TestItem } from "@/test/types"

export const createdTimeTest: TestItem = {
  describe: "Test createdTime",
  fieldMap: {
    key: "fld6e3rfKX",
    field: {
      id: "fld6e3rfKX",
      type: 1001,
      name: "创建时间",
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
    excel_field: "创建时间",
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
