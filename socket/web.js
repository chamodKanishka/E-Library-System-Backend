module.exports = function (io) {
  // init namespace
  const webSocket = io.of('/web')
  // auth middleware
  webSocket.use((socket, next) => {
    next()
  })

  webSocket.on('connection', (socket) => {
    // log connection
    console.log('socket -> connection:admin -> id: ' + socket.id)
    // log on disconnect
    socket.on('disconnect', () => {
      console.log('socket -> disconnected:admin -> id:' + socket.id)
    })
  })
}
