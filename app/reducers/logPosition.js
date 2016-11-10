export default function logPosition(state = "left", action) {
  switch (action.type) {
    case 'WINDOW_RESIZE':
      return action.logPosition
    default:
      return state
  }
}
