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

export function gameRoomKilled(id) {
  return {
    type: 'GAMEROOM_KILLED',
    id: id
  }
}

export function gameUpdated(obj) {
  return {
    type: 'GAME_UPDATED',
    game: obj.game,
    roomId: obj.roomId
  }
}

export function playerLinked(socketId) {
  return {
    type: 'PLAYER_LINKED',
    socketId: socketId
  }

}

export function gamePosition(roomId, position) {
  return {
    type: 'GAME_POSITION',
    roomId: roomId,
    position: position
  }
}

export function apiError(msg) {
  return {
    type: 'API_ERROR',
    messages: [{ msg }]
  }
}
