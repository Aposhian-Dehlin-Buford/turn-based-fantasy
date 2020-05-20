let users = []

module.exports = {
  getUsers: (req, res) => {
    res.status(200).send(users)
  },
  join: (app, body) => {
    const io = app.get('io')
    const socket = app.get('socket')
    socket.join('userlist')
    users.push(body)
    console.log(users)
    io.in('userlist').emit('users', users)
  },
  leave: (app, body) => {
    const io = app.get('io')
    console.log(body.user_id)
    const userIndex = users.findIndex(u => {
      console.log(u)
      return +u.user_id === +body.user_id
    })
    console.log(userIndex)
    users.splice(userIndex, 1)
    console.log({users})
    io.in('userlist').emit('users', users)
  }
}