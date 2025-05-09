// import { setupServer } from "msw/node"
// import { HttpResponse, http } from "msw"
// import { GEO_URL, REGEO_URL, geo, regeo, isLatLongitude } from "@/utils"
import { describe, expect, it, beforeAll, afterAll, afterEach } from "vitest"
// import { locationCache } from "@/utils/cellValue/location"

// const regeoLocations = [
//   {
//     record_id: "116.310003,39.991957",
//     address: "北京市海淀区燕园街道北京大学",
//     adname: "海淀区",
//     cityname: "",
//     full_address: "北京市海淀区燕园街道北京大学",
//     location: "116.310003,39.991957",
//     name: "北京市海淀区燕园街道北京大学",
//     pname: "北京市",
//   },
//   {
//     record_id: "37.4226618,-122.0825951197085",
//     address: "",
//     adname: "",
//     cityname: "",
//     full_address: "",
//     location: "37.4226618,-122.0825951197085",
//     name: "",
//     pname: "",
//   },
// ]

// const geoLocations = [
//   {
//     record_id: "北京市海淀区理想国际大厦",
//     address: "北京市海淀区理想国际大厦",
//     adname: "海淀区",
//     cityname: "北京市",
//     full_address: "北京市海淀区理想国际大厦",
//     location: "116.310060,39.984499",
//     name: "北京市海淀区理想国际大厦",
//     pname: "北京市",
//   },
//   {
//     record_id: "北京市海淀区学清嘉创大厦",
//     address: "北京市海淀区学清嘉创大厦",
//     adname: "海淀区",
//     cityname: "北京市",
//     full_address: "北京市海淀区学清嘉创大厦",
//     location: "116.352969,40.014472",
//     name: "北京市海淀区学清嘉创大厦",
//     pname: "北京市",
//   },
// ]

// const server = setupServer(
//   http.post(GEO_URL, async ({ request }) => {
//     const body = (await request.json()) as {
//       location_list: {
//         input: string
//         record_id: string
//       }[]
//     }
//     const { location_list } = body
//     const input = location_list.map((i: any) => i.input)
//     return HttpResponse.json(
//       geoLocations.filter((i) => input.includes(i.record_id)),
//     )
//   }),
//   http.post(REGEO_URL, async ({ request }) => {
//     const body = (await request.json()) as {
//       location_list: {
//         input: string
//         record_id: string
//       }[]
//     }
//     const { location_list } = body
//     const input = location_list.map((i: any) => i.input)
//     return HttpResponse.json(
//       regeoLocations.filter((i) => input.includes(i.record_id)),
//     )
//   }),
// )
// beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
// afterAll(() => server.close())
// afterEach(() => server.resetHandlers())

describe("location test", () => {
  it("test geo", async () => {
    // const res = await geo(geoLocations.map((i) => i.record_id))
    // expect(res).toEqual(geoLocations)
  })
  // it("test regeo", async () => {
  //   const res = await regeo(regeoLocations.map((i) => i.location))
  //   expect(res).toEqual(regeoLocations)
  // })
  // it("test isLatLongitude", async () => {
  //   expect(isLatLongitude("116.310003,39.991957")).toBe(true)
  //   expect(isLatLongitude("116.310003, 39.991957")).toBe(true)
  //   expect(isLatLongitude("北京市海淀区理想国际大厦")).toBe(false)
  // })
})
