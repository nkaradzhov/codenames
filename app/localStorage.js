export const loadGamePositions = () => {
  try {
    const serialized = localStorage.getItem('gamePositions')
    if(serialized === null) {
      return undefined
    }
    return JSON.parse(serialized)
  } catch(err) {
    return undefined
  }
}

export const saveGamePositions = gamePositions => {
  try {
    const serialized = JSON.stringify(gamePositions)
    localStorage.setItem('gamePositions', serialized)
  } catch(err) {
    //ignore
  }
}
