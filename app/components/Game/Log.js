import React from 'react'
import StylePropTracker from '../misc/StylePropTracker'

const hint = hint => {
  return (
    <span>{`${hint.hint.toUpperCase()} ${hint.count}`}</span>
  )
}

const guess = card => {
  return (
    <span className={card.type}>{card.text.toUpperCase()}</span>
  )
}

const logItem = (item, i) => {
  return (
    <li key={i}>
      <b>{item.player.name.substring(0,4)}: </b>
      {item.action === 'hint'?
        hint(item.hint) :
        item.action === 'guess'?
        guess(item.card) : 'pass'
      }
    </li>
  )
}

const select = (style) => {
  const margin = style.marginLeft //e.g. '202px'
  return parseFloat(margin.substring(0, margin.length - 2))
}

const Log = ({log}) => {
  return (
    <StylePropTracker selector=".board" select={select} max="220" throttle="300">
    {(isMore) => {
      const containerClass = `log-container-${isMore? 'left' : 'bottom'}`
      const listClass = `log-list ${isMore? '' : 'log-list-botto  m'}`
      return (
        <div className={containerClass}>
          <ul className={listClass}>
            {log.map(logItem)}
          </ul>
        </div>
      )
    }}
    </StylePropTracker>
  )
}

export default Log
