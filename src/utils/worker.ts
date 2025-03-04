export function makeWorker(fn: Function): Worker {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`(${fn.toString()})()`])),
  )
  return worker
}
