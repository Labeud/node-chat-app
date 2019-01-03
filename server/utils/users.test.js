const expect = require("expect")

const {Users} = require("./users")

let users

beforeEach(() => {
  users = new Users()
  users.users = [{
    id: "1",
    name: "Mike",
    room: "Test"
  },{
    id: "2",
    name: "Jen",
    room: "Test"
  },{
    id: "3",
    name: "Alex",
    room: "Other"
  }]
})

describe("Users", () => {
  it("should add a new user", () => {
    let users = new Users()
    user = {
      id: "123",
      name: "John",
      room: "New room"
    }

    users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user])
  })

  it("should return names for Test room", () => {
    const userList = users.getUserList("Test")
    expect(userList).toEqual(["Mike","Jen"])
  })

  it("should return names for Other room", () => {
    const userList = users.getUserList("Other")
    expect(userList).toEqual(["Alex"])
  })

  it("should find user Alex", () => {
    const user = users.getUser("3")
    expect(user.name).toBe("Alex")
    expect(user.room).toBe("Other")
  })

  it("should not find any user", () => {
    const user = users.getUser("333")
    expect(user).toBeFalsy
  })

  it("should remove user Jen", () => {
    const removedUser = users.removeUser("2")
    expect(removedUser.id).toBe("2")
    expect(removedUser.name).toBe("Jen")
    expect(removedUser.room).toBe("Test")
    expect(users.users.length).toBe(2)
  })

  it("should not remove any user", () => {
    const removedUser = users.removeUser("222")
    expect(removedUser).toBeFalsy
    expect(users.users.length).toBe(3)
  })
})