export function gameRooms(gameRooms) {
  return {
    type: 'GAMEROOMS',
    gameRooms: gameRooms
  }
}

export function gameRoomAdded(gameRoom) {
  return {
    type: 'GAMEROOM_ADDED',
    gameRoom: gameRoom
  }
}

export function gameRoomUpdated(room) {
  return {
    type: 'GAMEROOM_UPDATED',
    room: room
  }
}

export function gameRoomsUpdated(rooms) {
  return {
    type: 'GAMEROOMS_UPDATED',
    rooms: rooms
  }
}

export function apiError(msg) {
  return {
    type: 'API_ERROR',
    messages: [{msg}]
  }
}
