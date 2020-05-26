const removeSocketId = (users) =>
  users.map(({ username, email, user_id }) => ({
    username,
    email,
    user_id,
  }))

module.exports = {
  removeSocketId: (users) => {
    return removeSocketId(users)
  },
  generateInitialGameState: ({ challenger, opponent }) => {
    const activePlayer = Math.floor(Math.random() * 2 < 1) ? 0 : 1
    const players = [
      {
        ...challenger,
        resources: {
          tech: 1,
        },
      },
      {
        ...opponent,
        resources: {
          tech: 1,
        },
      },
    ]
    return {
      players,
      activePlayer,
      gameStart: true,
      room: `${challenger.user_id}-${opponent.user_id}`,
    }
  },
  findChallengeIndex: (challenges, body) => {
    const { challenger, opponent } = body
    return challenges.findIndex((c) => {
      if (
        (c.challenger.user_id === challenger.user_id &&
          c.opponent.user_id === opponent.user_id) ||
        (c.challenger.user_id === opponent.user_id &&
          c.opponent.user_id === challenger.user_id)
      ) {
        return c
      }
    })
  },
  removeUserFromList: (app, socket) => {
    const io = app.get("io")
    const users = app.get("users")
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
    app.set("users", users)
    socket.leave('userlist')
    io.in("userlist").emit("users", removeSocketId(users))
    return user_id
  },
  removeUserChallenges: (user_id, app) => {
    const io = app.get("io")
    const challenges = app.get("challenges")
    const updatedChallenges = challenges.filter((c) => {
      if (c.challenger.user_id === user_id || c.opponent.user_id === user_id) {
        return null
      } else {
        return c
      }
    })
    app.set("challenges", updatedChallenges)
    io.in("userlist").emit("remove-challenge", { user_id })
  },
}
