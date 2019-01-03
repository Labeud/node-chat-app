const expect = require("expect")

const {isRealString} = require("./validation")

describe("isRealString", () => {
  it("should reject non string values", () => {
    const res = isRealString(123)
    expect(res).toBe(false)
  })

  it("should reject strings with only spaces", () => {
    const res = isRealString("         ")
    expect(res).toBe(false)    
  })

  it("should allow strings with non-space characters", () => {
    const res = isRealString("   g  ")
    expect(res).toBe(true)       
  })
})