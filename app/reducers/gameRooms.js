import { replace, replaceAll } from './utils'

const select = room => room.id

const game = (state, action) => {
  switch (action.type) {
    case 'GAME_UPDATED':
      return Object.assign({}, state, action.game)
    default:
      return state
  }
}

const gameRoom = (state, action) => {
  switch (action.type) {
    case 'GAMEROOM_ADDED':
      return action.gameRoom
    case 'GAMEROOM_UPDATED':
      if (state.id !== action.room.id)
        return state
      return Object.assign({}, state, action.room)
    case 'GAME_UPDATED':
      if (state.id !== action.roomId)
        return state
      return Object.assign({}, state, {
        game: game(state.game, action)
      })
    default:
      return state
  }
}

export default function gameRooms(state = [], action) {
  switch (action.type) {
    case 'GAMEROOMS':
      return action.gameRooms.map(r => gameRoom(r, action))
    case 'GAMEROOM_ADDED':
      return [...state, gameRoom(undefined, action)]
    case 'GAMEROOM_UPDATED':
      return state.map(r => gameRoom(r, action))
    case 'GAME_UPDATED':
      return state.map(r => gameRoom(r, action))
        // case 'GAMEROOMS_UPDATED':
        //   return replaceAll(select, state, action.rooms)
    default:
      return state;
  }
}
