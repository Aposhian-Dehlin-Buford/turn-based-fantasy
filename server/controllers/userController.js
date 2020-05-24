let users = []

const removeSocketId = (users) =>
  users.map(({ username, email, user_id }) => ({
    username,
    email,
    user_id,
  }))

module.exports = {
  getUsers: (req, res) => {
    const users = req.app.get("users")
    res.status(200).send(removeSocketId(users))
  },
  join: (app, body, socket) => {
    const io = app.get("io")
    // const socket = app.get("socket")
    const users = app.get("users")
    socket.join("userlist")
    users.push({ ...body, socket_id: socket.id })
    app.set("users", users)
    io.in("userlist").emit("users", removeSocketId(users))
  },
  leave: (app, socket) => {
    const io = app.get("io")
    const users = app.get("users")
    const challenges = app.get("challenges")
    const { userIndex, user_id } = users.reduce(
      (acc, e, i) => {
        if (e.socket_id === socket.id) {
          acc.userIndex = i
          acc.user_id = e.user_id
        }
        return acc
      },
      { userIndex: null, user_id: null }
    )
    users.splice(userIndex, 1)
    const updatedChallenges = challenges.filter((c) => {
      if (c.challenger.user_id === user_id || c.opponent.user_id === user_id) {
        return null
      } else {
        return c
      }
    })
    app.set("users", users)
    app.set("challenges", updatedChallenges)
    io.in("userlist").emit("users", removeSocketId(users))
    io.in("userlist").emit("remove-challenge", { user_id })
  },
}
