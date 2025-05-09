import { TestItem } from "@/test/types"

export const locationTest: TestItem = {
  describe: "Test location",
  fieldMap: {
    key: "fldvxQ4Txw",
    field: {
      id: "fldvxQ4Txw",
      type: 22,
      name: "地理位置",
      property: {
        inputType: "NOT_LIMIT",
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
    excel_field: "地理位置",
  },
  test: [
    {
      testTitle:
        'Test location: "深圳湾创新科技中心，广东深圳南山科苑地铁站C出口" => "深圳湾创新科技中心，广东深圳南山科苑地铁站C出口"',
      value: "深圳湾创新科技中心，广东深圳南山科苑地铁站C出口",
      normalized: "深圳湾创新科技中心，广东深圳南山科苑地铁站C出口",
    },
  ],
}
