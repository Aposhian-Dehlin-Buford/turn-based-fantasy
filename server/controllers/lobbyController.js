let lobbies = []

const exampleBody = {
  challenger: { user_id: 1, username: "1", email: "1", socket_id: 23847239 },
  opponent: { user_id: 2, username: "2", email: "2", socket_id: 23794239874 },
  gameStart: false,
}

module.exports = {
  getLobbies: (req, res) => {
    res.status(200).send(lobbies)
  },
  challenge: (app, body) => {
    const io = app.get("io")
    const users = app.get("users")
    const challenges = app.get("challenges")
    const { challenger, opponent } = body
    const alreadyChallenged = challenges.find((c) => {
      if (
        (c.challenger.user_id === challenger.user_id &&
          c.opponent.user_id === opponent.user_id) ||
        (c.challenger.user_id === opponent.user_id &&
          c.opponent.user_id === challenger.user_id)
      ) {
        return c
      }
    })
    if (!alreadyChallenged) {
      challenges.push(body)
      const opponentSocket = users.find((u) => +opponent.user_id === +u.user_id)
      console.log(`${challenger.username} challenged ${opponent.username}`)
      console.log(opponentSocket.socket_id)
      app.set("challenges", challenges)
      io.to(opponentSocket.socket_id).emit("send-challenge", body)
    }
  },
  joinLobby: (app, body) => {},
  leaveLobby: (app, body) => {},
}
