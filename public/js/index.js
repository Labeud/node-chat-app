const socket = io()

socket.on("connect", function () {
  console.log("Connected to server.")

  socket.emit("createMessage", {
    from: "Théo",
    text: "Teub Out!"
  })
})

socket.on("disconnect", function () {
  console.log("Disconnected from server.")
})

socket.on("newMessage", function (message) {
  console.log("New in the chat: ", message)
})