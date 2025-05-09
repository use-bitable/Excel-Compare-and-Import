import { TestItem } from "@/test/types"

export const singleSelectTest: TestItem = {
  describe: "Test singleSelect",
  fieldMap: {
    key: "fldoU5B9dr",
    field: {
      id: "fldoU5B9dr",
      type: 3,
      name: "单选",
      property: {
        options: [
          {
            id: "optmGO4SEu",
            color: 0,
            name: "a",
          },
          {
            id: "optHOUAkQ6",
            color: 1,
            name: "b",
          },
          {
            name: "c",
            id: "opt8zn18ez",
            color: 2,
          },
          {
            id: "optEN2GmzZ",
            color: 3,
            name: "d",
          },
          {
            color: 4,
            name: "z",
            id: "optoxiUQep",
          },
        ],
        optionsType: 0,
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
    excel_field: "单选",
  },
  test: [
    {
      testTitle: 'Test singleSelect: "a" => "a"',
      value: "a",
      normalized: "a",
    },
  ],
}
