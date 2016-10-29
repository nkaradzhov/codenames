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
    socket.on('become observer', become(socket, 'observer'))
    socket.on('become red-tell', become(socket, 'red-tell'))
    socket.on('become red-guess', become(socket, 'red-guess'))
    socket.on('become blue-tell', become(socket, 'blue-tell'))
    socket.on('become blue-guess', become(socket, 'blue-guess'))

    socket.on('start game', startGame)

    socket.on('disconnect', leave(socket))

  })

  function startGame(options) {
    var room = gameRooms.findRoom(options.roomId)
    var game = gameRooms.startGame(room.id)

    room.players.forEach(function(p) {
      channel.to(p.player.socketId).emit('game updated',{
        roomId: room.id,
        game: gameRooms.getGameState(game, p.position)
      })
    })
  }

  function become(socket, position) {
    return function(options) {
      var room = gameRooms.updatePlayerPosition(options.roomId, options.playerId, position)
      channel.emit('room updated', room)
      var game = gameRooms.findGame(room.id)
      if(game)
        socket.emit('game updated', {
          roomId: room.id,
          game: gameRooms.getGameState(game, position)
        })
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
      var room = gameRooms.joinRoom(options.roomId, options.player, options.position)
      if (room) {
        socket.join(options.roomId)
        channel.emit('room updated', room)
      } else {
        socket.emit('warn', 'room does not exist')
      }
    }
  }

}
