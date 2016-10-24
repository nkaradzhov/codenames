import React from 'react';
import {connect} from 'react-redux'
import {gameRooms, gameRoomAdded, setCurrentGameRoom } from '../actions/lobby'
import { Link } from 'react-router';

class Lobby extends React.Component {

  componentDidMount() {
    var dispatch = this.props.dispatch
    this.context.channel.on('gameRooms', function(grs) {
      dispatch(gameRooms(grs))
    })
    this.context.channel.on('gameRoom added', function(gr) {
      dispatch(gameRoomAdded(gr))
    })
  }

  createGameRoom() {
    this.context.channel.emit('createRoom')
  }

  setCurrentGameRoom(gameRoom) {
    this.props.dispatch(setCurrentGameRoom(gameRoom))
  }

  render() {
    const gameRooms = this.props.gameRooms.map(gameRoom => (
      <li onClick={()=>this.setCurrentGameRoom(gameRoom)} key={gameRoom.id}><Link to={`/gameRoom/${gameRoom.id}`}>{gameRoom.name}</Link></li>
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
