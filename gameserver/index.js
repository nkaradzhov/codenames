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

    socket.on('tell', play(tell))
    socket.on('guess', play(guess))
    socket.on('pass', play(pass))

    socket.on('disconnect', leave(socket))
  })

  function pass(options, game) {
    game.pass(options.player)
  }

  function tell(options, game) {
    var method = options.player.slot.indexOf('red') > -1 ? 'redTell' : 'blueTell'
    game[method](options.player, options.hint)
  }
  function guess(options, game) {
    var method = options.player.slot.indexOf('red') > -1 ? 'redGuess' : 'blueGuess'
    game[method](options.player, options.pos)
  }

  function play(f) {
    return function(options) {
      var room = gameRooms.findRoom(options.roomId)
      if (!room)
        return
      var game = gameRooms.findGame(options.roomId)
      if (!game)
        return

      f(options, game)

      broadcastGameState(room)
    }
  }

  function startGame(options) {
    var room = gameRooms.findRoom(options.roomId)
    gameRooms.startGame(room.id)
    broadcastGameState(room)
  }

  function broadcastGameState(room) {
    room.players.forEach(function(p) {
      sendGameState(channel.to(p.player.socketId), room.id, p.position)
    })
  }

  function become(socket, position) {
    return function(options) {
      var room = gameRooms.updatePlayerPosition(options.roomId, options.playerId, position)
      channel.emit('room updated', room)
      sendGameState(socket, room.id, position)
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
        sendGameState(socket, room.id, options.position)
      } else {
        socket.emit('warn', 'room does not exist')
      }
    }
  }

  function sendGameState(socket, roomId, position) {
    var game = gameRooms.findGame(roomId)
    if (game)
      socket.emit('game updated', {
        roomId: roomId,
        game: gameRooms.getGameState(game, position)
      })
  }

}
