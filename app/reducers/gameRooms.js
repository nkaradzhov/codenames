export default function gameRooms(state = [], action) {
  switch (action.type) {
    case 'GAMEROOMS':
      return action.gameRooms
    case 'GAMEROOM_ADDED':
      return [...state, action.gameRoom]
    default:
      return state;
  }
}
