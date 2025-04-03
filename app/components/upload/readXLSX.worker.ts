import { readXLSX } from "./readXLSX"

onmessage = async function (e) {
  const { data } = e
  const { type, payload } = data
  if (type === "readXLSX") {
    const { data, name, headIndex } = payload
    const result = await readXLSX(data, name, {
      onError: ({ message, payload }) =>
        postMessage({
          type: "error",
          payload: {
            message,
            payload,
          },
        }),
      headIndex,
    })
    postMessage({ type: "readXLSX", payload: result })
  }
}
