var uuid = require('node-uuid');
var Moniker = require('moniker');
var names = Moniker.generator([Moniker.adjective, Moniker.noun]);

var rooms = []

module.exports = {
  createRoom: createRoom,
  findRoom: findRoom,
  getRooms: getRooms,
  joinRoom: joinRoom,
  leaveRoom: leaveRoom
};

function leaveRoom(id, playerId) {
  var room = findRoom(id)
  if (!room)
    return false
  room.players = room.players.filter(function(p) {
    return p.player._id !== playerId
  })

  return true //no need :D
}

function joinRoom(id, player) {
  var room = findRoom(id)
  if (!room)
    return false

  if (playerIsInRoom(room, player))
    return false

  room.players.push({
    player: player,
    position: 'observer'
  })

  return true
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
    name: generateName(gameRooms),
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
