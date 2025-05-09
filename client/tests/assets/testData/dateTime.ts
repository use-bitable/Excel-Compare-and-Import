import { TestItem } from "@/test/types"

export const dateTimeTest: TestItem = {
  describe: "Test dateTime",
  fieldMap: {
    key: "fldJon8klZ",
    field: {
      id: "fldJon8klZ",
      type: 5,
      name: "日期",
      property: {
        dateFormat: "yyyy/MM/dd",
        displayTimeZone: false,
        autoFill: false,
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
    writable: true,
    excel_field: "日期",
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
