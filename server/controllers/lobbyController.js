const {
  newGenerateInitialGameState,
  removeUserFromList,
  removeUserChallenges,
  generateInitialGameState,
  findChallengeIndex,
} = require("../utils/lobbyUtils")

const exampleBody = {
  challenger: { user_id: 1, username: "1", email: "1", socket_id: 23847239 },
  opponent: { user_id: 2, username: "2", email: "2", socket_id: 23794239874 },
  gameStart: false,
  map: {}
}

module.exports = {
  getLobbies: (req, res) => {
    res.status(200).send(req.app.get("lobbies"))
  },
  challenge: (app, body) => {
    const io = app.get("io")
    const users = app.get("users")
    const challenges = app.get("challenges")
    const { challenger, opponent } = body
    if (findChallengeIndex(challenges, body) === -1) {
      challenges.push(body)
      const opponentSocket = users.find((u) => +opponent.user_id === +u.user_id)
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
    if (findChallengeIndex(challenges, body) !== -1) {
      const gameState = generateInitialGameState(body)
      lobbies.push(gameState)
      const challengerSocket = users.find(
        (u) => +challenger.user_id === +u.user_id
      )
      const opponentSocket = users.find((u) => +opponent.user_id === +u.user_id)
      removeUserChallenges(challenger.user_id, app)
      removeUserChallenges(opponent.user_id, app)
      app.set("lobbies", lobbies)
      const { room } = gameState
      newGenerateInitialGameState(io, body, challengerSocket, opponentSocket)
      // io.sockets.connected[challengerSocket.socket_id].join(room)
      // io.sockets.connected[opponentSocket.socket_id].join(room)
      // io.to(room).emit("game-start", gameState)
    }
  },
  joinLobby: (app, body) => {},
  leaveLobby: (app, body) => {},
}
