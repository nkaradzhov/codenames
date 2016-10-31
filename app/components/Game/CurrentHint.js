import React from 'react'

const represent = count => count === 10 ? 'inf' : count

const CurrentHint = ({hint}) => (
  <div className="middle-box">
    <h1>{hint.hint} {hint.count}</h1>
  </div>
)

export default CurrentHint
