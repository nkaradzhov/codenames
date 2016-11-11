import React from 'react';
import {connect} from 'react-redux';
import Messages from '../Messages';
import NotFound from '../NotFound';
import GameStatus from './GameStatus';
import Hint from './Hint';
import CurrentHint from './CurrentHint';
import Log from './Log';
import beep from '../../misc/beep';

class Game extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(this.props.currentGameRoom && this.props.currentGameRoom.game) //got game
      if(this.props.currentGameRoom.game.turn !== nextProps.currentGameRoom.game.turn) //turn changed
        if(this.props.gamePosition === nextProps.currentGameRoom.game.turn) //will be my turn
          beep()

    if (!this.props.user.socketId && nextProps.user.socketId) {
      console.log('trying to join room ', this.props.gamePosition);
      this.context.channel.emit('join', {
        roomId: this.props.params.roomId,
        player: nextProps.user,
        position: this.props.gamePosition
      })
    }
  }

  onHint(hint) {
    this.context.channel.emit('tell', {
      roomId: this.props.params.roomId,
      hint: hint,
      player: {
        name: this.props.user.name,
        slot: this.props.gamePosition
      }
    })
  }

  onCardClick(pos) {
    if (this.isMyTurn() && this.isGuess()) {
      this.context.channel.emit('guess', {
        roomId: this.props.params.roomId,
        pos:pos,
        player: {
          name: this.props.user.name,
          slot: this.props.gamePosition
        }
      })
    }
  }

  onPassClick() {
    this.context.channel.emit('pass', {
      roomId: this.props.params.roomId,
      player: {
        name: this.props.user.name,
        slot: this.props.gamePosition
      }
    })
  }

  isMyTurn() {
    return this.props.gamePosition === this.props.currentGameRoom.game.turn
  }

  isTell() {
    return  this.props.gamePosition.indexOf('tell') > -1
  }

  isGuess() {
    return this.props.gamePosition.indexOf('guess') > -1
  }

  getCurrentHint(game) {
    const turn = game.turn
    if(turn === 'red-guess')
      return game.redHint
    if(turn === 'blue-guess')
      return game.blueHint
    return null
  }

  render() {
    if(!this.props.currentGameRoom || !this.props.currentGameRoom.game)
      return <NotFound />

    const isMyTurn = this.isMyTurn()
    const isTell = this.isTell()
    const isGuess = this.isGuess()

    const renderHint = isMyTurn && isTell
    const currentHint = this.getCurrentHint(this.props.currentGameRoom.game)
    const renderCurrentHint = !!currentHint
    const renderPassButton = isMyTurn && isGuess


    return (
      <div>
        <GameStatus user={this.props.user} room={this.props.currentGameRoom} />
        <div className="board">
          {this.renderCards(this.props.currentGameRoom.game.cards)}
        </div>
        {renderHint && <Hint onHint={this.onHint.bind(this)} />}
        {renderCurrentHint && <CurrentHint hint={currentHint} />}
        {renderPassButton &&
          <div className="middle-box">
            <button onClick={this.onPassClick.bind(this)} className="btn btn-primary" type="button">Pass</button>
          </div>}
        <Log log={this.props.currentGameRoom.game.log} />
      </div>
    );

  }

  renderCards(cards) {
    return cards.map((card, i) => {
      const style = `card ${card.type? `card card-${card.type}` : ''} ${card.revealed? `card-revealed`: ''}`
      return <div onClick={()=>{this.onCardClick(card.pos)}} key={i} className={style}>{card.text}</div>
    })
  }

}

Game.contextTypes = {
  channel: React.PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    currentGameRoom: state.gameRooms.filter(room => room.id === ownProps.params.roomId )[0],
    gamePosition: state.gamePositions[ownProps.params.roomId]
  }
}

export default connect(mapStateToProps)(Game);
