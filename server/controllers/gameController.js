const progressResources = (resources) => {
  return {
    tech: resources.tech + 1,
  }
}
module.exports = {
  endTurn: (app, socket, { resources, room }) => {
    // console.log(resources)
    const io = app.get("io")
    socket.emit("update-resources",  progressResources(resources) )
    io.in(room).emit("change-player")
    //emit switch active player, add logic to progress resources
  },
}
