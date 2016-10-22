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
