const expect = require("expect")

const {generateMessage} = require("./message")

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Test"
    const text = "This is a test"
    const res = generateMessage(from, text)

    expect(res).toMatchObject({from, text})
    expect(typeof res.createdAt).toBe("number")
  })
})