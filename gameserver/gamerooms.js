var gameRooms = require('./grs')

module.exports = function(io) {
  var channel = io.of('/gameRooms')

  channel.on('connection', function(socket) {
    socket.emit('gameRooms', gameRooms.getRooms())
    socket.on('createRoom', function() {
      channel.emit('gameRoom added', gameRooms.createRoom())
    })
    socket.on('joinRoom', function(options) {
      gameRooms.joinRoom(options.roomId, options.player)
      var room = gameRooms.findRoom(options.roomId)
      socket.join(options.roomId)
      channel.in(options.roomId).emit('players', room.players)
    })
    socket.on('disconnect', function() {
      gameRooms.
    })
  })

  function joinRoom(socket) {
    return function(options) {
      var gameRoom = findGameRoom(options.roomId, gameRooms)
      if(!playerInRoom(options.player, gameRoom)) {
        gameRoom.players.observers.push(options.player)
        socket.join(gameRoom.id)
        channel.in(gameRoom.id).emit('players', gameRoom.players)
      }
    }
  }

  function createRoom() {
    var room = {
      name: generateName(gameRooms),
      id: uuid.v4(),
      players: {
        observers: [],
        redTell: null,
        blueTell: null,
        redGuess: null,
        blueGuess: null,
      }
    }
    gameRooms.push(room)
    channel.emit('gameRoom added', room)
  }
};

function generateName(gameRooms) {
  function find(name) {
    return gameRooms.filter(function(gameRoom) {
      return gameRoom.name === name
    }).length > 0
  }
  var name = names.choose()
  var found = find(name)
  while(found) {
    name = names.choose()
    found = find(name)
  }
  return name;
}

function findGameRoom(id, gameRooms) {
  return gameRooms.filter(function(gameRoom) {
    return gameRoom.id === id
  })[0]
}

function playerInRoom(player, room) {
  var obs = room.players.observers.filter(function(p) {
    return p._id === player._id
  })
  if(obs.length > 0) return true
  if(room.players.redTell && room.players.redTell._id === player._id) return true
  if(room.players.blueTell && room.players.blueTell._id === player._id) return true
  if(room.players.redGuess && room.players.redGuess._id === player._id) return true
  if(room.players.blueGuess && room.players.blueGuess._id === player._id) return true
  return false
}
