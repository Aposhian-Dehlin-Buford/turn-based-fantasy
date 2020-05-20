let lobbies = []

const exampleBody = {
    challenger: {user_id: 1, username: '1', email: '1'},
    opponent: {user_id: 2, username: '2', email: '2'},
    gameStart: false
}

module.exports = {
    getLobbies: (req, res) => {
        res.status(200).send(lobbies)
    },
    challengePlayer: (app, body) => {
    },
    joinLobby: (app, body) => {},
    leaveLobby: (app, body) => {}
}