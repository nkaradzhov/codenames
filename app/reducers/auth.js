const initialState = {
  token: null,
  user: {}
};

export default function auth(state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
    case 'OAUTH_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: Object.assign({}, state.user, action.user)
      });
    case 'LOGOUT_SUCCESS':
      return initialState;
    case 'PLAYER_LINKED':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          socketId: action.socketId
        })
      })
    default:
      return state;
  }
}
