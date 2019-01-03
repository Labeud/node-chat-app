const socket = io()

function scrollToBottom () {
  // Selectors
  const messages = jQuery("#messages")
  const newMessage = messages.children("li:last-child")
  // Heights
  const clientHeight = messages.prop("clientHeight")
  const scrollTop = messages.prop("scrollTop")
  const scrollHeight = messages.prop("scrollHeight")
  const newMessageHeight = newMessage.innerHeight()
  const lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on("connect", function () {
  const params = jQuery.deparam(window.location.search)

  socket.emit("join", params, function (err) {
    if (err) {
      alert(err)
      window.location.href = "/"
    } else {
      console.log("No error.")
    }
  })
})

socket.on("disconnect", function () {
  console.log("Disconnected from server.")
})

socket.on("updateUserList", function (users) {
  const ol = jQuery("<ol></ol>")

  users.forEach((user) => {
    ol.append(jQuery("<li></li>").text(user))
  })

  jQuery("#users").html(ol)
})

socket.on("newMessage", function (message) {
  // console.log("New message in the chat: ", message)
  const formattedTime = moment(message.createdAt).format("h:mm a")
  const template = jQuery("#message-template").html()
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })

  jQuery("#messages").append(html)
  scrollToBottom()

  
  // let li = jQuery("<li></li>")
  // li.text(`${message.from} ${formattedTime}: ${message.text}`)
  // jQuery("#messages").append(li)
})

socket.on("newLocationMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("h:mm a")
  const template = jQuery("#location-message-template").html()
  const html = Mustache.render(template, {
    url: message.url,
    from : message.from,
    createdAt: formattedTime
  })

  jQuery("#messages").append(html)
  scrollToBottom()

  // let li = jQuery("<li></li>")
  // let a = jQuery("<a target='_blank'>My current location</a>")

  // li.text(`${message.from} ${formattedTime}: `)
  // a.attr("href", message.url)
  // li.append(a)
  // jQuery("#messages").append(li)
})

jQuery("#message-form").on("submit", (e) => {
  e.preventDefault()

  let messageTextBox = jQuery("[name=message]")

  socket.emit("createMessage", {
    from: "User",
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val("")
  })
})

const locationBtn = jQuery("#send-location")

locationBtn.on("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.")
  }

  locationBtn.attr("disabled", "disabled").text("Sending location...")

  navigator.geolocation.getCurrentPosition((position) => {
    locationBtn.removeAttr("disabled").text("Send location")
    socket.emit("createLocationMessage", {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }, () => {
    locationBtn.removeAttr("disabled").text("Send location")
    alert("Unable to fetch location.")
  })
})