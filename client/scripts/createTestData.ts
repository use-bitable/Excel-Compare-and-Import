import Mock from "mockjs"
import { program } from "commander"
import * as XLSX from "xlsx/xlsx.mjs"

/* load 'fs' for readFile and writeFile support */
import * as fs from "fs"
import path from "path"

XLSX.set_fs(fs)
program.option("-n, --number <number>", "number of data", "20")
program.parse()

const options = program.opts()

console.log(options)

const number = Number(options.number)

const Data = Mock.mock({
  [`list|${number}`]: [
    {
      "id|+1": 1,
      "name": "@cname",
      "age|18-21": 1,
      "sex|1": ["男", "女"],
      "birthday": "@date",
      "address": "@county(true)",
      "phone": /^1[385][1-9]\d{8}/,
      "email": "@EMAIL",
      "url": "@url",
      "score|1-100.1-2": 1,
    },
  ],
})

const fileName = path.resolve(__dirname, "../test/data/data.xlsx")

const ws = XLSX.utils.json_to_sheet(Data.list)
const wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
// XLSX.write(wb, { bookType: 'xlsx', type: 'buffer', compression: true });
XLSX.writeFile(wb, fileName)
