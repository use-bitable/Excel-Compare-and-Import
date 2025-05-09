const ID = "virtual:meta"

export function Meta(stage: { [key: string]: any }) {
  return {
    name: "meta",
    resolveId(id: string) {
      return id === ID ? "\0" + ID : null
    },
    load(id: string) {
      if (id !== "\0" + ID) return null
      return `export default ${JSON.stringify(stage)}`
    },
  }
}
