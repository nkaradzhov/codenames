import React from 'react'
import StylePropTracker from '../misc/StylePropTracker'

const hint = hint => {
  return (
    <b>{`${hint.hint.toUpperCase()} ${hint.count}`}</b>
  )
}

const guess = card => {
  return (
    <b className={card.type}>{card.text.toUpperCase()}</b>
  )
}

const logItem = (item, i) => {
  return (
    <li key={i}>
      <span>{item.player.name.substring(0,4)}: </span>
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
            {log.length?
              log.slice().reverse().map(logItem):
              <li><p>LOG</p></li>
            }
          </ul>
        </div>
      )
    }}
    </StylePropTracker>
  )
}

export default Log
