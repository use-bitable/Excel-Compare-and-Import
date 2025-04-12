import type { SheetInfo } from "@/types/types"
import { Media } from "exceljs"

type ReadError = {
  message: string
  payload?: any
  error?: any
}

interface readOptions {
  onError?: (error: ReadError) => void
  headIndex?: number
}

let XLSX: typeof import("xlsx") | null = null
let ExcelJS: typeof import("exceljs") | null = null

async function initExcelJS() {
  const ExcelJS = await import("exceljs")
  return ExcelJS
}

async function initXLSX() {
  const XLSX = await import("xlsx")
  const cptable = await import("xlsx/dist/cpexcel.full.mjs")
  XLSX.set_cptable(cptable)
  return XLSX
}

function uint8ArrayToBase64Image(ab: ArrayBuffer, mimeType: string) {
  const uint8Array = new Uint8Array(ab)
  let binary = ""
  const len = uint8Array.length
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8Array[i])
  }
  const base64 = btoa(binary)
  return `data:${mimeType};base64,${base64}`
}

export async function readXLSX(
  data: ArrayBuffer,
  name: string,
  options: readOptions = {},
) {
  const { onError = null, headIndex = 1 } = options
  try {
    if (!XLSX) XLSX = await initXLSX()
    if (!ExcelJS) ExcelJS = await initExcelJS()
    const excelJSWorkbook = new ExcelJS.Workbook()
    await excelJSWorkbook.xlsx.load(data)
    const imageMap = new Map<string, Media>()
    excelJSWorkbook.eachSheet((sheet, sheetId) => {
      sheet.getImages().forEach((image) => {
        const img = excelJSWorkbook.model.media.find(
          (m) => m.index === image.imageId,
        )
        if (img) {
          const key = `${image.range.tl.nativeRow},${image.range.tl.nativeCol}`
          imageMap.set(key, img)
        }
      })
    })

    const workbook = XLSX.read(data, {
      type: "buffer",
      raw: true,
      codepage: 65001,
    })
    const headIndexNum = Math.max(+headIndex - 1, 0)
    const sheets = workbook.SheetNames.map((name) => {
      const sheet = workbook.Sheets[name]

      const tableData = XLSX!.utils.sheet_to_json(sheet, {
        header: 1,
        raw: false,
        range: headIndexNum,
      }) as any[][]
      if (tableData.length <= 1) return null
      try {
        const fields = tableData[0]?.map((name: string) => ({
          name: String(name),
        }))
        const records = tableData
          .slice(1)
          .map((row: (string | null)[], rowIndex: number) => {
            const record: { [key: string]: string | null | Blob } = {}
            for (let index = 0; index < row.length; index++) {
              const value = row[index]
              const key = `${rowIndex + 1 + headIndexNum},${index}`
              if (value == null) {
                const img = imageMap.get(key)
                if (img) {
                  // record[fields[index].name] = uint8ArrayToBase64Image(img.buffer, `image/${img.extension}`)
                  record[fields[index].name] = new Blob([img.buffer], {
                    type: `image/${img.extension}`,
                  })
                }
              } else {
                record[fields[index].name] = String(value)
              }
            }
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
