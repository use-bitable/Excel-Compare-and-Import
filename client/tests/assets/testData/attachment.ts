import { TestItem } from "@/test/types"

export const attachmentTest: TestItem = {
  describe: "Test attachment",
  fieldMap: {
    key: "fldWTTq6t8",
    field: {
      id: "fldWTTq6t8",
      type: 17,
      name: "附件",
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
    excel_field: "附件",
    config: {
      separator: ",",
      requestConfig: {
        method: "GET",
        headers: [],
        body: "",
      },
    },
    root: true,
    hasChildren: false,
    children: [],
    writable: true,
  },
  test: [
    {
      testTitle:
        'Test attachment default separator(","): "https://www.baidu.com,https://http://lcgtfrhil.ly/cjihdpdrt" => ["https://www.baidu.com","https://http://lcgtfrhil.ly/cjihdpdrt"]',
      value: "https://www.baidu.com,https://http://lcgtfrhil.ly/cjihdpdrt",
      normalized: [
        "https://www.baidu.com",
        "https://http://lcgtfrhil.ly/cjihdpdrt",
      ],
    },
  ],
}
