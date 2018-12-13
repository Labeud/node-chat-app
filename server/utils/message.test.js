const expect = require("expect")

const {generateMessage, generateLocationMessage} = require("./message")

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Test"
    const text = "This is a test"
    const res = generateMessage(from, text)

    expect(res).toMatchObject({from, text})
    expect(typeof res.createdAt).toBe("number")
  })
})

describe("genereateLocationMessage", () => {
  it("should generate the location message", () => {
    const from = "Alex"
    const lat = 10
    const lng = 20
    url = `https://www.google.com/maps?q=${lat},${lng}`
    const msg = generateLocationMessage(from, lat, lng)

    expect(msg).toMatchObject({from, url})
    expect(typeof msg.createdAt).toBe("number")
  })
})