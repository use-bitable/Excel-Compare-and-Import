import { TestItem } from "@/test/types"

export const ratingTest: TestItem = {
  describe: "Test rating",
  fieldMap: {
    key: "fldWhjuyj2",
    field: {
      id: "fldWhjuyj2",
      type: 99004,
      name: "评分",
      property: {
        rating: {
          icon: "flower",
        },
        min: 1,
        max: 5,
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
    excel_field: "评分",
  },
  test: [
    {
      testTitle: 'Test int number: "1" => 1',
      value: "1",
      normalized: 1,
    },
    {
      testTitle: 'Test float number: "1.1" => 1.1',
      value: "1.1",
      normalized: 1.1,
    },
    {
      testTitle: 'Test percentage: "10%" => 0.1',
      value: "10%",
      normalized: 0.1,
    },
  ],
}
