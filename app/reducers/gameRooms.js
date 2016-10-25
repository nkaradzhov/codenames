import { replace, replaceAll } from './utils'

const select = room => room.id

export default function gameRooms(state = [], action) {
  switch (action.type) {
    case 'GAMEROOMS':
      return action.gameRooms
    case 'GAMEROOM_ADDED':
      return [...state, action.gameRoom]
    case 'GAMEROOM_UPDATED':
      return replace(select, state, action.room)
    case 'GAMEROOMS_UPDATED':
      return replaceAll(select, state, action.rooms)
    default:
      return state;
  }
}
