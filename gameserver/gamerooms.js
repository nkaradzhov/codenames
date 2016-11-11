var uuid = require('node-uuid');
var Moniker = require('moniker');
var names = Moniker.generator([Moniker.adjective, Moniker.noun]);

var Game = require('./game')
var generateCards = require('./game/cards-generator')

var rooms = []
var games = {}

module.exports = {
  createRoom: createRoom,
  findRoom: findRoom,
  getRooms: getRooms,
  joinRoom: joinRoom,
  leaveRooms: leaveRooms,
  leaveRoom: leaveRoom,
  updatePlayerPosition: updatePlayerPosition,
  findGame: findGame,
  startGame: startGame,
  getGameState: getGameState,
  killRoom: killRoom,
};

function killRoom(id) {
  rooms = rooms.filter(function(room) {
    return room.id != id
  })
}

function findGame(roomId) {
  return games[roomId]
}

function startGame(roomId) {
  var game = games[roomId]

  if (!game)
    game = games[roomId] = new Game(generateCards())

  return game
}

function updatePlayerPosition(roomId, playerId, position) {
  var room = findRoom(roomId)

  var isOk = true
  var player

  room.players.forEach(function(p) {
    if (p.player._id === playerId)
      player = p

    if (p.position !== 'observer' && p.position === position)
      isOk = false
  })

  if (isOk)
    player.position = position

  return room
}

function leaveRoom(roomId, playerId) {
  var room = findRoom(roomId)
  if(room) {
    room.players = room.players.filter(function(p) {
      return p.player._id !== playerId
    })
    return room
  }
  return false
}

function leaveRooms(socketId) {
  console.log('socket leaving ', socketId);
  var updatedRooms = []

  rooms = rooms.map(function(room) {
    var filteredPlayers = room.players.filter(function(p) {
      return p.player.socketId !== socketId
    })
    if (room.players.length !== filteredPlayers.length) {
      console.log('leaving ', room.name);
      room.players = filteredPlayers
      updatedRooms.push(room)
    }
    return room
  })
  return updatedRooms
}

function joinRoom(id, player, position) {
  var room = findRoom(id)
  if (!room)
    return false

  var pos = 'observer'
  if (position && !positionTaken(room, position))
    pos = position

  if (!playerIsInRoom(room, player))
    room.players.push({
      player: player,
      position: pos
    })

  return room
}

function getGameState(game, pos) {
  if(!pos) return game.getGuessState()
  return pos.indexOf('tell') > -1 ? game.getTellState() : game.getGuessState()
}

function positionTaken(room, position) {
  return room.players.filter(function(p) {
      return p.position === position
    })
    .length > 0
}

function playerIsInRoom(room, player) {
  return room.players.filter(function(p) {
      return p.player._id === player._id
    })
    .length > 0
}

function getRooms() {
  return rooms
}

function findRoom(id) {
  return rooms.filter(function(room) {
    return room.id === id
  })[0]
}

function createRoom() {
  var room = {
    name: generateName(rooms),
    id: uuid.v4(),
    players: []
  }
  rooms.push(room)
  return room
}

function generateName(rooms) {
  function find(name) {
    return rooms.filter(function(room) {
        return room.name === name
      })
      .length > 0
  }
  var name = names.choose()
  var found = find(name)
  while (found) {
    name = names.choose()
    found = find(name)
  }
  return name;
}
