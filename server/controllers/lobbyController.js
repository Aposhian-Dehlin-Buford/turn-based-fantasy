const exampleBody = {
  challenger: { user_id: 1, username: "1", email: "1", socket_id: 23847239 },
  opponent: { user_id: 2, username: "2", email: "2", socket_id: 23794239874 },
  gameStart: false,
}

const generateInitialGameState = ({challenger, opponent}) => {
  const activePlayer = Math.floor(Math.random() * 2 < 1) ? 0 : 1
  const players = [challenger, opponent]
  return { players, activePlayer, gameStart: true }
}

const checkChallenges = () => {}

module.exports = {
  getLobbies: (req, res) => {
    res.status(200).send(req.app.get('lobbies'))
  },
  challenge: (app, body) => {
    const io = app.get("io")
    const users = app.get("users")
    const challenges = app.get("challenges")
    const { challenger, opponent } = body
    const challengeIndex = challenges.findIndex((c) => {
      if (
        (c.challenger.user_id === challenger.user_id &&
          c.opponent.user_id === opponent.user_id) ||
        (c.challenger.user_id === opponent.user_id &&
          c.opponent.user_id === challenger.user_id)
      ) {
        return c
      }
    })
    if (challengeIndex === -1) {
      challenges.push(body)
      const opponentSocket = users.find((u) => +opponent.user_id === +u.user_id)
      console.log(`${challenger.username} challenged ${opponent.username}`)
      app.set("challenges", challenges)
      io.to(opponentSocket.socket_id).emit("send-challenge", body)
    }
  },
  acceptChallenge: (app, body) => {
    const io = app.get("io")
    const users = app.get("users")
    const challenges = app.get("challenges")
    const lobbies = app.get("lobbies")
    const { challenger, opponent } = body
    const challengeIndex = challenges.findIndex((c) => {
      if (
        (c.challenger.user_id === challenger.user_id &&
          c.opponent.user_id === opponent.user_id) ||
        (c.challenger.user_id === opponent.user_id &&
          c.opponent.user_id === challenger.user_id)
      ) {
        return c
      }
    })
    if (challengeIndex !== -1) {
      const gameState = generateInitialGameState(body)
      lobbies.push(gameState)
      const challengerSocket = users.find(
        (u) => +challenger.user_id === +u.user_id
      )
      const opponentSocket = users.find((u) => +opponent.user_id === +u.user_id)
      app.set("challenges", challenges)
      app.set("lobbies", lobbies)
      io.to(challengerSocket.socket_id).emit("game-start", gameState)
      io.to(opponentSocket.socket_id).emit("game-start", gameState)
    }
  },
  joinLobby: (app, body) => {},
  leaveLobby: (app, body) => {},
}
