export default function auth(state = {}, action) {
  switch (action.type) {
    case 'GAME_POSITION':
      state[action.roomId] = action.position
      return Object.assign({}, state);
    default:
      return state;
  }
}
