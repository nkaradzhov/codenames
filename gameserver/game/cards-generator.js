'use strict';
const shuffle = require('mout/array/shuffle');
const words = require('./words.json').words
const times = (value, times) => {
  const arr = []
  while (times--)
    arr.push(value)
  return arr
}



const types = times('red', 8)
  .concat(times('blue', 8))
  .concat(times('neutral', 7))
  .concat('assassin')

const generate = () => {

  const shuffled = shuffle(words)

  let i = 0
  const cards = types.concat(Math.random() >= 0.5 ? 'red' : 'blue')
    .map(type => {
      return {
        text: shuffled[i],
        type: type,
        pos: i++,
        revealed: false
      }
    })

  return shuffle(cards)
}

module.exports = generate;
