import React from 'react'
import {hintRep} from '../misc/Utils'

const represent = count => count === 10 ? 'inf' : count

const CurrentHint = ({hint}) => (
  <div className="middle-box">
    <h1>{hintRep(hint)}</h1>
  </div>
)

export default CurrentHint
