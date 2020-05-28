const {
  removeUserFromList,
  removeUserChallenges,
  removeSocketId,
} = require("../utils/lobbyUtils")

module.exports = {
  getUsers: (req, res) => {
    const users = req.app.get("users")
    res.status(200).send(removeSocketId(users))
  },
  join: (app, body, socket) => {
    const io = app.get("io")
    const users = app.get("users")
    socket.join("userlist")
    users.push({ ...body, socket_id: socket.id })
    app.set("users", users)
    io.in("userlist").emit("users", removeSocketId(users))
  },
  leave: (app, socket) => {
    const user_id = removeUserFromList(app, socket)
    removeUserChallenges(user_id, app)
  },
}
