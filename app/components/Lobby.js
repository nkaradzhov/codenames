import React from 'react';
import {connect} from 'react-redux'
import { setCurrentGameRoom } from '../actions/socketapi'
import { Link } from 'react-router';

class Lobby extends React.Component {

  createGameRoom() {
    this.context.channel.emit('create')
  }

  setCurrentGameRoom(gameRoom) {
    this.props.dispatch(setCurrentGameRoom(gameRoom))
    this.props.history.push(`/gameRoom/${gameRoom.id}`)
  }

  render() {
    const gameRooms = this.props.gameRooms.map(gameRoom => (
      <li onClick={()=>this.setCurrentGameRoom(gameRoom)} key={gameRoom.id}>
        {gameRoom.name}
        [{gameRoom.players.map(p=> p.player.name).join(' ')}]
      </li>
    ))
    return (
      <div>
        <div>Lobby</div>
        <button onClick={this.createGameRoom.bind(this)}>Create Game Room</button>
        <ul>{gameRooms}</ul>
      </div>
    );
  }
}

Lobby.contextTypes = {
  channel: React.PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
  gameRooms: state.gameRooms
})

export default connect(mapStateToProps)(Lobby);
