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

export function setCurrentGameRoom(gameRoom) {
  return {
    type: 'SET_CURRENT_GAMEROOM',
    gameRoom: gameRoom
  }
}

export function gameRoomPlayers(players) {
  return {
    type: 'GAMEROOM_PLAYERS',
    players: players
  }
}

export function apiError(msg) {
  return {
    type: 'API_ERROR',
    messages: [{msg}]
  }
}
