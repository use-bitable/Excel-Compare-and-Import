import type { SheetInfo } from "@/types/types"

type ReadError = {
  message: string
  payload?: any
  error?: any
}

interface readOptions {
  onError?: (error: ReadError) => void
}

let XLSX: typeof import("xlsx") | null = null

async function initXLSX() {
  const XLSX = await import("xlsx")
  const cptable = await import("xlsx/dist/cpexcel.full.mjs")
  XLSX.set_cptable(cptable)
  return XLSX
}

export async function readXLSX(
  data: ArrayBuffer,
  name: string,
  options: readOptions = {},
) {
  const { onError = null } = options
  try {
    if (!XLSX) XLSX = await initXLSX()
    const workbook = XLSX.read(data, {
      type: "buffer",
      raw: true,
      codepage: 65001,
    })
    const sheets = workbook.SheetNames.map((name) => {
      const sheet = workbook.Sheets[name]
      const tableData = XLSX!.utils.sheet_to_json(sheet, {
        header: 1,
        raw: false,
      }) as any[][]
      if (tableData.length <= 1) return null
      try {
        const fields = tableData[0]?.map((name: string) => ({
          name: String(name),
        }))
        const records = tableData
          .slice(1)
          .map((row: (string | null)[]) => {
            const record: { [key: string]: string | null } = {}
            row.forEach((value, index) => {
              record[fields[index].name] = value !== null ? String(value) : null
            })
            return record
          })
          .filter((record) => {
            return Object.values(record).some((value) => {
              return value !== null
            })
          })
        if (records.length) return { name, tableData: { fields, records } }
        return null
      } catch (e) {
        onError &&
          onError({
            message: "message.sheetError",
            payload: {
              sheetName: name,
            },
          })
        return null
      }
    }).filter((sheet) => sheet !== null) as SheetInfo[]
    if (sheets.length === 0) {
      onError &&
        onError({
          message: "message.noSheet",
        })
      return null
    }
    return { sheets, name }
  } catch (e) {
    onError &&
      onError({
        message: "message.fileError",
        error: e,
      })
    return null
  }
}
