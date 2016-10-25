var uuid = require('node-uuid');
var Moniker = require('moniker');
var names = Moniker.generator([Moniker.adjective, Moniker.noun]);

var rooms = []

module.exports = {
  createRoom: createRoom,
  findRoom: findRoom,
  getRooms: getRooms,
  joinRoom: joinRoom,
  leaveRooms: leaveRooms,
  updatePlayerPosition: updatePlayerPosition
};

function updatePlayerPosition(roomId, playerId, position) {
  var room = findRoom(roomId)

  var isOk = true
  var player

  room.players.forEach(function(p) {
    if(p.player._id === playerId)
      player = p

    if(p.position !== 'observer' && p.position === position)
      isOk = false
  })

  if(isOk)
    player.position = position

  return room
}

function leaveRooms(playerId) {
  var updatedRooms = []

  rooms = rooms.map(function(room) {
    var filteredPlayers = room.players.filter(function(p) {
      return p.player._id !== playerId
    })
    if(room.players.length !== filteredPlayers.length) {
      room.players = filteredPlayers
      updatedRooms.push(room)
    }
    return room
  })
  return updatedRooms
}

function joinRoom(id, player) {
  var room = findRoom(id)
  if (!room)
    return false

  if (!playerIsInRoom(room, player))
    room.players.push({
      player: player,
      position: 'observer'
    })

  return room
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
