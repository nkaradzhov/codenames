var gameRooms = require('./grs')

var links = {}

module.exports = function(httpServer) {

  var channel = require('socket.io')
    .listen(httpServer)
    .of('/gameRooms');

  channel.on('connection', function(socket) {

    socket.on('link', function(playerId) {
      console.log('player linked ', playerId, socket.id);
      links[socket.id] = playerId
    })

    socket.emit('rooms', gameRooms.getRooms())
    socket.on('create', create)
    socket.on('join', join(socket))
    socket.on('disconnect', leave(socket))

  })

  function leave(socket) {
    return function() {
      var playerId = links[socket.id]
      gameRooms.leaveRooms(playerId)
      channel.emit('rooms', gameRooms.getRooms())
    }
  }

  function create() {
    channel.emit('room added', gameRooms.createRoom())
  }

  function join(socket) {
    return function(options) {
      var room = gameRooms.joinRoom(options.roomId, options.player)
      if (room) {
        socket.join(options.roomId)
        channel.emit('rooms', gameRooms.getRooms())
      } else {
        socket.emit('warn', 'room does not exist')
      }
    }
  }

}
