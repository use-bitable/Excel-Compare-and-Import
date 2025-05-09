/**
 * Check if the target array has new element from the from array
 *
 * @param target
 * @param from
 * @returns
 */
export function hasNewElement(target: string[], from: string[]): boolean {
  const res = !from.every((v) => target.includes(v))
  return res
}

/**
 * Delay Time
 *
 * @param t
 * @returns
 */
export function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t)
  })
}

/**
 * Async filter
 *
 * @param arr
 * @param predicate
 * @returns
 */
export async function asyncFilter(
  arr: any[],
  predicate: (item: any) => Promise<boolean>,
) {
  const results = await Promise.all(arr.map(predicate))
  return arr.filter((_v, index) => results[index])
}

/**
 * Check if the two arrays are equal
 *
 * @param arr1
 * @param arr2
 * @returns
 */
export function isArrayEqual(arr1: any[], arr2: any[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((v) => {
      return arr2.includes(v)
    })
  )
}

/**
 * Check if the two arrays are equal strictly
 *
 * @param arr1
 * @param arr2
 * @returns
 */
export function isArrayStrictEqual(arr1: any[], arr2: any[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((v, i) => {
      if (Array.isArray(v)) {
        return isArrayEqual(v, arr2[i])
      }
      return v === arr2[i]
    })
  )
}

/**
 * Group by key
 *
 * @param arr
 * @param key
 * @returns
 */
export function groupBy<T extends Record<string, any>>(
  arr: Array<T>,
  key: string,
) {
  const res: Record<string, T[]> = {}
  const keys = key.split(".")
  arr.forEach((v) => {
    let k: any = v
    for (const key of keys) {
      k = k[key]
    }
    if (!res[k]) {
      res[k] = []
    }
    res[k].push(v)
  })
  return res
}

/**
 * Check if the value is not null
 *
 * @param v
 * @returns
 */
export function isNotNull<T>(v: T | null): v is T {
  return v !== null
}

/**
 * Check if the value is not null or undefined
 *
 * @param v
 * @returns
 */
export function isNotEmpty<T>(v: T | null | undefined): v is T {
  return v !== null && v !== undefined
}

/**
 * Check if the value is not null or undefined or empty string
 *
 * @param v
 * @returns
 */
export function isNotEmptyString(v: string | null | undefined): v is string {
  return v !== null && v !== undefined && v !== ""
}

/**
 * Check if the value is not null or undefined or empty array
 *
 * @param v
 * @returns
 */
export function isNotEmptyArray<T>(v: T[] | null | undefined): v is T[] {
  return v !== null && v !== undefined && v.length > 0
}

/**
 * Check if the array has empty value
 *
 * @param v
 * @returns
 */
export function ArrayHasNoEmpty<T>(v: (T | null | undefined)[]): v is T[] {
  return v.every(isNotEmpty)
}

/**
 * Unique array
 *
 * @param arr
 * @returns
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

/**
 * Batch processing
 *
 * @param maxNumber
 * @param interval
 * @param list
 * @param action
 * @returns
 */
export async function batch<T>(
  maxNumber: number = 5000,
  interval: number = 0,
  list: Array<T>,
  action: (list: Array<T>) => Promise<void>,
) {
  if (list.length === 0) return
  if (list.length <= maxNumber) {
    await action(list)
  } else {
    const count = Math.ceil(list.length / maxNumber)
    for (let i = 0; i < count; i++) {
      await action(list.slice(i * maxNumber, (i + 1) * maxNumber))
      if (interval > 0) {
        await delay(interval)
      }
    }
  }
}
