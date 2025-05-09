import { TestItem } from "@/test/types"

export const checkboxTest: TestItem = {
  describe: "Test checkbox",
  fieldMap: {
    key: "fld6LtA72N",
    field: {
      id: "fld6LtA72N",
      type: 7,
      name: "复选框",
      property: null,
      isPrimary: false,
      description: {
        disableSyncToFormDesc: false,
        content: null,
      },
    },
    table: "tblxarg8wkDhmjW1",
    config: {
      boolValue: {
        true: ["是", "True", "true", "TRUE", "1", "☑️"],
        false: ["否", "False", "false", "FALSE", "0", ""],
      },
    },
    root: true,
    hasChildren: false,
    children: [],
    writable: true,
    excel_field: "复选框",
  },
  test: [
    {
      testTitle: 'Test checkbox: "是" => true',
      value: "是",
      normalized: true,
    },
    {
      testTitle: 'Test checkbox: "否" => false',
      value: "否",
      normalized: false,
    },
    {
      testTitle: 'Test checkbox: "True" => true',
      value: "True",
      normalized: true,
    },
    {
      testTitle: 'Test checkbox: "False" => false',
      value: "False",
      normalized: false,
    },
    {
      testTitle: 'Test checkbox: "true" => true',
      value: "true",
      normalized: true,
    },
    {
      testTitle: 'Test checkbox: "false" => false',
      value: "false",
      normalized: false,
    },
    {
      testTitle: 'Test checkbox: "TRUE" => true',
      value: "TRUE",
      normalized: true,
    },
    {
      testTitle: 'Test checkbox: "FALSE" => false',
      value: "FALSE",
      normalized: false,
    },
    {
      testTitle: 'Test checkbox: "1" => true',
      value: "1",
      normalized: true,
    },
    {
      testTitle: 'Test checkbox: "0" => false',
      value: "0",
      normalized: false,
    },
    {
      testTitle: 'Test checkbox: "☑️" => true',
      value: "☑️",
      normalized: true,
    },
    {
      testTitle: 'Test checkbox: "" => false',
      value: "",
      normalized: false,
    },
    {
      testTitle: 'Test checkbox(TrueValue: ["True"]): "1" => false',
      value: "1",
      normalized: false,
      config: {
        boolValue: {
          true: ["True"],
          false: ["False"],
        },
      },
    },
  ],
}
