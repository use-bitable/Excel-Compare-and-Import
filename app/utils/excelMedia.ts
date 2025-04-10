import { ExcelDataInfo } from "@/types/types"

export function handleExcelDataInfo(data: ExcelDataInfo | null) {
  if (!data) return
  const { sheets } = data
  sheets.forEach((sheet) => {
    const { tableData } = sheet
    const { records } = tableData
    records.forEach((record) => {
      Object.keys(record).forEach((key) => {
        if ((record[key] as unknown) instanceof Blob) {
          record[key] = URL.createObjectURL(record[key] as unknown as Blob)
        }
      })
    })
  })
}
