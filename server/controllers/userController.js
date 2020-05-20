let users = []

module.exports = {
  getUsers: (req, res) => {
    res.status(200).send(users)
  },
  join: (app, body) => {
    const io = app.get("io")
    const socket = app.get("socket")
    socket.join("userlist")
    users.push(body)
    io.in("userlist").emit("users", users)
  },
  leave: (app, body) => {
    const io = app.get("io")
    users.splice(users.findIndex((u) => +u.user_id === +body.user_id),1)
    io.in("userlist").emit("users", users)
  },
}
