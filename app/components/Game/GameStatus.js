import React from 'react';
import GameOver from './GameOver';
// import GameTurn from './GameTurn';

class GameStatus extends React.Component {

  findPlayerPosition() {
    return this.props.room.players.filter(p => p.player._id === this.props.user._id)[0].position
  }

  findPlayers(players) {
      let redTell = '', blueTell = '', redGuess = '', blueGuess = ''

      players.forEach(p => {
        if(p.position ==='red-tell')
          redTell = p.player.name
        if(p.position ==='blue-tell')
          blueTell = p.player.name
        if(p.position ==='red-guess')
          redGuess = p.player.name
        if(p.position ==='blue-guess')
          blueGuess = p.player.name
      })
      return {redTell, blueTell, redGuess, blueGuess}
  }

  findScore(game) {
    let redScore = game.first === 'red' ? 9 : 8
    let blueScore = game.first === 'blue' ? 9 : 8
    game.cards.forEach(card => {
      if(card.revealed && card.type === 'red')
        redScore--
      if(card.revealed && card.type === 'blue')
        blueScore--
    })
    return {redScore, blueScore}
  }

  componentDidMount() {
    this.setTitle()
  }

  componentDidUpdate() {
    this.setTitle()
  }

  setTitle() {
    const filtered = this.props.room.players.filter(player => player.position === this.props.room.game.turn)
    if(filtered.length === 1) {
      const player = filtered[0].player
      if(player.name === this.props.user.name)
        document.title = `Your Turn!`
      else
        document.title = `${player.name}\`s turn`
    }
  }

  render() {

    if(this.props.room.game.winner) {
      const win = this.findPlayerPosition().indexOf(this.props.room.game.winner) > -1 ? 'won' : 'lost'
      return <GameOver win={win} />
    }
        // <GameTurn />

    const {redTell, blueTell, redGuess, blueGuess} = this.findPlayers(this.props.room.players)
    const {redScore, blueScore} = this.findScore(this.props.room.game)
    const active = position => this.props.room.game.turn === position? 'active' : ''
    return (
      <div>
        <div className="game-status">
          <div className="horizontal">
            <div className={`red ${active('red-tell')}`}>{redTell}</div>
            <div className={`red ${active('red-guess')}`}>{redGuess}</div>
          </div>
          <div className="vertical">
            <div className="red score">{redScore}</div>
            <div className="score">-</div>
            <div className="blue score">{blueScore}</div>
          </div>
          <div className="horizontal">
            <div className={`blue ${active('blue-tell')}`}>{blueTell}</div>
            <div className={`blue ${active('blue-guess')}`}>{blueGuess}</div>
          </div>
        </div>
      </div>
    )
  }

}

export default GameStatus;
