module.exports = function (io) {
  io.on('connection', (socket) => {
    // log connection
    console.log('socket -> connection -> id: ' + socket.id)
    // log on disconnect
    socket.on('disconnect', () => {
      console.log('socket -> disconnected -> id: ' + socket.id)
    })
  })
  // init namespaces
  require('./web')(io)
}
