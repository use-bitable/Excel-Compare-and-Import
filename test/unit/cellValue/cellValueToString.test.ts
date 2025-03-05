import { cellValueToString } from "../../../app/utils/cellValue"
import { describe, it, expect } from "vitest"

describe("cellValueToString test", () => {
  it("IOpenSegment[]", () => {
    const value = [
      {
        type: "text", // 文本类型
        text: "Hello world",
      }, // type: IOpenTextSegment
      {
        type: "url", // URL 类型
        text: "https://feishu.cn",
        link: "https://feishu.cn",
      }, // type: IOpenUrlSegment
      {
        type: "mention", // @人 类型
        mentionType: "User", //
        name: "李健", // 人名
        text: "@李健",
        en_name: "Jian Li",
        token: "ou_xxx", // OpenId，暂未支持
      }, // type: IOpenUserMentionSegment
      {
        type: "mention", // 文档类型
        mentionType: "Bitable", // Bitable 文档
        text: "未命名多维表格",
        token: "basxxxx",
        link: "https://www.feishu.cn/base/basxxxxx",
      }, // type: IOpenDocumentMentionSegment
    ]
    expect(cellValueToString(value)).toMatchSnapshot()
  })

  it("IOpenSingleSelect", () => {
    const value = {
      id: "option_id",
      text: "option_text",
    }
    expect(cellValueToString(value)).toMatchSnapshot()
  })

  it("IOpenMultiSelect", () => {
    const value = [
      {
        id: "option_id",
        text: "option_text",
      },
      {
        id: "option_id",
        text: "option_text",
      },
    ]
    expect(cellValueToString(value)).toMatchSnapshot()
  })

  it("IOpenUser[]", () => {
    const value = [
      {
        name: "@李健", // 人名
        enName: "@JianLi", // 英文名
        email: "lijian@feishu.cn", // 邮箱
        id: "ou_xxx", // OpenId
      },
    ]
    expect(cellValueToString(value)).toMatchSnapshot()
  })

  it("number", () => {
    const value = 1
    expect(cellValueToString(value)).toMatchSnapshot()
  })

  it("string", () => {
    const value = "string"
    expect(cellValueToString(value)).toMatchSnapshot()
  })

  it("IOpenCheckbox", () => {
    const value = true
    expect(cellValueToString(value)).toMatchSnapshot()
  })

  it("IOpenLocation", () => {
    const value = {
      address: "科苑地铁站C出口",
      adname: "南山区",
      cityname: "深圳市",
      full_address: "深圳湾创新科技中心，广东深圳南山科苑地铁站C出口",
      fullAddress: "深圳湾创新科技中心，广东深圳南山科苑地铁站C出口",
      location: "113.946874,22.52835",
      name: "深圳湾创新科技中心",
      pname: "广东省",
    }
    expect(cellValueToString(value)).toMatchSnapshot()
  })
})
