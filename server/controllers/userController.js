let users = []

const removeSocketId = (users) => {
  // console.log(users)
  return users.map(({ username, email, user_id }) => ({
    username,
    email,
    user_id,
  }))
  // console.log(newUsers)
  // return newUsers
}

module.exports = {
  getUsers: (req, res) => {
    const users = req.app.get("users")
    const list = removeSocketId(users)
    console.log(list)
    res.status(200).send(list)
  },
  join: (app, body) => {
    const io = app.get("io")
    const socket = app.get("socket")
    const users = app.get("users")
    socket.join("userlist")
    users.push({ ...body, socket_id: socket.id })
    app.set("users", users)
    io.in("userlist").emit("users", removeSocketId(users))
  },
  leave: (app, body) => {
    const io = app.get("io")
    const users = app.get("users")
    users.splice(
      users.findIndex((u) => +u.user_id === +body.user_id),
      1
    )
    app.set("users", users)
    io.in("userlist").emit("users", removeSocketId(users))
  },
}
