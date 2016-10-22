var uuid = require('node-uuid');
var Moniker = require('moniker');
var names = Moniker.generator([Moniker.adjective, Moniker.noun]);

module.exports = function(io) {
  var channel = io.of('/gameRooms')

  var gameRooms = []

  channel.on('connection', function(socket) {
    socket.emit('gameRooms', gameRooms)
    socket.on('create', createRoom)
  })

  function createRoom() {
    var room = {
      name: generateName(gameRooms),
      id: uuid.v4()
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
