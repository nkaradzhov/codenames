var gameRooms = require('./gamerooms')

module.exports = function(httpServer) {

  var channel = require('socket.io')
    .listen(httpServer)
    .of('/gameRooms');

  channel.on('connection', function(socket) {
    console.log('new connection ', socket.id);
    socket.emit('rooms', gameRooms.getRooms())
    socket.on('create', create)
    socket.on('join', join(socket))
    socket.on('become observer', become('observer'))
    socket.on('become red tell', become('red tell'))
    socket.on('become red guess', become('red guess'))
    socket.on('become blue tell', become('blue tell'))
    socket.on('become blue guess', become('blue guess'))

    socket.on('start game', startGame)

    socket.on('disconnect', leave(socket))

  })

  function startGame(options) {
    var room = gameRooms.findRoom(options.roomId)
    var game = gameRooms.startGame(room.id)

    room.players.forEach(function(p) {
      var gameState = p.position.indexOf('tell') > -1 ?
        game.getTellState() : game.getGuessState()
        channel.to(p.player.socketId).emit('game updated',{
          roomId: room.id,
          game: gameState
        })
    })
  }

  function become(position) {
    return function(options) {
      var room = gameRooms.updatePlayerPosition(options.roomId, options.playerId, position)
      channel.emit('room updated', room)
    }
  }

  function leave(socket) {
    return function() {
      var updatedRooms = gameRooms.leaveRooms(socket.id)
      updatedRooms.forEach(function(room) {
        channel.emit('room updated', room)
      })
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
        channel.emit('room updated', room)
      } else {
        socket.emit('warn', 'room does not exist')
      }
    }
  }

}
