export default function gameRooms(state = [], action) {
  switch (action.type) {
    case 'GAMEROOMS':
      return action.gameRooms
    case 'GAMEROOM_ADDED':
      return [...state, action.gameRoom]
    case 'GAMEROOM_UPDATED':
      return updateGameRoom(state, action.room)
    default:
      return state;
  }
}

function updateGameRoom(rooms, room) {
  var index = 0
  rooms.forEach(function(r,i) {
    if(r.id === room.id)
      index = i
  })
  return rooms.slice(0,index).concat(room).concat(rooms.slice(index+1))
}
