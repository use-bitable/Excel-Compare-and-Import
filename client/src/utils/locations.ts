export interface LocationResponse {
  record_id: string
  address: string
  adname: string
  cityname: string
  full_address: string
  location: string
  name: string
  pname: string
}

// Thanks to Chris Chou's help for providing the API
export const GEO_URL = "https://base-translator-api.replit.app/base_geo"
export const REGEO_URL = "https://base-translator-api.replit.app/base_regeo"

const geoHeader = new Headers()
geoHeader.append("Content-Type", "application/json")
geoHeader.append("Referer", "https://location-utils.plz.click")

/**
 * location text to base location
 *
 * @param locations
 * @returns
 */
export async function geo(locations: string[]) {
  const fetchOptions = {
    method: "POST",
    headers: geoHeader,
    body: JSON.stringify({
      brand: "feishu",
      location_list: locations.map((i) => {
        return {
          record_id: i,
          input: i,
        }
      }),
    }),
    redirect: "follow" as RequestRedirect,
  }
  return fetch(GEO_URL, fetchOptions)
    .then((response) => response.text())
    .then((res) => JSON.parse(res) as LocationResponse[])
}

const regeoHeader = new Headers()
regeoHeader.append("Content-Type", "application/json")
regeoHeader.append("Referer", "https://location-utils.plz.click")

/**
 * Latitude and longitude to base location
 *
 * @param locations
 * @returns
 */
export async function regeo(locations: string[]) {
  const fetchOptions = {
    method: "POST",
    headers: regeoHeader,
    body: JSON.stringify({
      brand: "feishu",
      location_list: locations.map((i) => {
        return {
          record_id: i,
          input: i,
        }
      }),
    }),
    redirect: "follow" as RequestRedirect,
  }
  return fetch(REGEO_URL, fetchOptions)
    .then((response) => response.text())
    .then((res) => JSON.parse(res) as LocationResponse[])
}

export function isLatLongitude(value: string) {
  const regoReg = /^(\d+(\.\d+)?)[,][\s]*(\d+(\.\d+)?)$/
  return regoReg.test(value)
}
