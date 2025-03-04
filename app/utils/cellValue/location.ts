import {
  type ILocationField,
  FieldType,
  IOpenLocation,
} from "@lark-base-open/js-sdk"
import { defineTranslator, type AsyncParams, FieldRole } from "./cell"
import {
  unique,
  batch,
  geo,
  regeo,
  isLatLongitude,
  type LocationResponse,
} from "@/utils"
import type { fieldMap } from "@/types/types"

export let locationCache: Record<string, IOpenLocation> = {}

export const LIMIT_NUMBER = 50
export const LIMIT_INTERVAL = 1000

export async function batchLocation(
  locations: string[],
  method: (list: string[]) => Promise<LocationResponse[]>,
  onProgress?: (num: number) => void,
) {
  await batch(LIMIT_NUMBER, LIMIT_INTERVAL, locations, async (list) => {
    const res = await method(list)
    res.forEach((i) => {
      locationCache[i.record_id] = {
        address: i.address,
        adname: i.adname,
        cityname: i.cityname,
        full_address: i.full_address,
        location: i.location.replace(/\s/g, ""),
        name: i.name,
        pname: i.pname,
        fullAddress: i.full_address,
      }
      onProgress?.(1)
    })
  })
}

/**
 * Get location information
 *
 * @param locations
 * @param options
 * @returns
 */
async function getLocation(
  locations: string[],
  options?: {
    type: "geo" | "regeo" | "auto"
    onProgress?: AsyncParams["onProgress"]
  },
) {
  const { type = "auto", onProgress } = options ?? {}
  let loaded = 0
  if (type === "auto") {
    const geoList = unique(locations.filter((i) => !isLatLongitude(i)))
    const regeoList = unique(locations.filter(isLatLongitude))
    if (geoList.length) {
      await batchLocation(geoList, geo, (num) => {
        onProgress?.({
          total: locations.length,
          loaded: loaded + num,
          message: `rate limit: ${LIMIT_NUMBER}/time`,
        })
      })
    }
    if (regeoList.length) {
      await batchLocation(regeoList, regeo, (num) => {
        onProgress?.({
          total: locations.length,
          loaded: loaded + num,
          message: `rate limit: ${LIMIT_NUMBER}/time`,
        })
      })
    }
    return
  }
  const method = type === "geo" ? geo : regeo
  await batchLocation(locations, method, (num) => {
    onProgress?.({
      total: locations.length,
      loaded: loaded + num,
      message: `rate limit: ${LIMIT_NUMBER}/time`,
    })
  })
}

async function location(value: string, field: ILocationField) {
  if (!value) return null
  const location = locationCache[value]
  if (!location) return null
  return field.createCell(location)
}

export const LocationTranslator = defineTranslator({
  fieldType: FieldType.Location,
  translate: location,
  normalization: async (value) => value,
  name: "Location",
  asyncMethod: async (
    options: AsyncParams<string>,
    config?: fieldMap["config"],
  ) => {
    const { data, onProgress, onError } = options
    const { locationConfig } = config ?? {}
    try {
      await getLocation(
        data.map((i) => i.trim()),
        {
          type: locationConfig?.type ?? "auto",
          onProgress,
        },
      )
    } catch (error) {
      onError?.(error)
    }
  },
  roles: [FieldRole.ASYNC],
  refresh: () => {
    locationCache = {}
  },
  reset: () => {},
})
