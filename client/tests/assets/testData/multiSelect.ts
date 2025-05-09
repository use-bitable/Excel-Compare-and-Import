import { TestItem } from "@/test/types"

export const multiSelectTest: TestItem = {
  describe: "Test multiSelect",
  fieldMap: {
    key: "fldsrfvpW6",
    field: {
      id: "fldsrfvpW6",
      type: 4,
      name: "多选",
      property: {
        options: [
          {
            id: "optdPbSDZW",
            color: 0,
            name: "a",
          },
          {
            name: "c",
            id: "optJ4SsECR",
            color: 1,
          },
          {
            name: "v",
            id: "optMk7nuh4",
            color: 2,
          },
          {
            name: " c",
            id: "optKMK1dxk",
            color: 3,
          },
          {
            name: "n",
            id: "optQIbePAJ",
            color: 5,
          },
          {
            id: "optiVPGKIa",
            color: 6,
            name: "m",
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
    config: {
      separator: ",",
    },
    root: true,
    hasChildren: false,
    children: [],
    writable: true,
    excel_field: "多选",
  },
  test: [
    {
      testTitle:
        'Test default separator (,): "a,c,v,n,m" => ["a","c","v","n","m"]',
      value: "a,c,v,n,m",
      normalized: ["a", "c", "v", "n", "m"],
    },
    {
      testTitle: 'Test separator (;): "a;c;v;n;m" => ["a", "c", "v", "n", "m"]',
      value: "a;c;v;n;m",
      normalized: ["a", "c", "v", "n", "m"],
      config: {
        separator: ";",
      },
    },
  ],
}
