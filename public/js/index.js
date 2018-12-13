const socket = io()

socket.on("connect", function () {
  console.log("Connected to server.")
})

socket.on("disconnect", function () {
  console.log("Disconnected from server.")
})

socket.on("newMessage", function (message) {
  console.log("New message in the chat: ", message)
  let li = jQuery("<li></li>")
  li.text(`${message.from}: ${message.text}`)

  jQuery("#messages").append(li)
})

socket.on("newLocationMessage", function (message) {
  let li = jQuery("<li></li>")
  let a = jQuery("<a target='_blank'>My current location</a>")

  li.text(`${message.from}: `)
  a.attr("href", message.url)
  li.append(a)
  jQuery("#messages").append(li)
})

jQuery("#message-form").on("submit", (e) => {
  e.preventDefault()

  socket.emit("createMessage", {
    from: "User",
    text: jQuery("[name=message]").val()
  }, function () {

  })
})

const locationBtn = jQuery("#send-location")

locationBtn.on("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.")
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("createLocationMessage", {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }, () => {
    alert("Unable to fetch location.")
  })
})