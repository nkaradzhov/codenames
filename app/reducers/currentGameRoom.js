const defaultState = {
  players: []
}
export default function currentGameRoom(state = defaultState, action) {
  switch (action.type) {
    case 'SET_CURRENT_GAMEROOM':
      return action.gameRoom
    case 'GAMEROOM_PLAYERS':
      return Object.assign({}, state, {players: action.players})
    default:
      return state;
  }
}
