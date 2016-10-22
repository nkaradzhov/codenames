import React from 'react';
import {connect} from 'react-redux'
import {gameRooms, gameRoomAdded} from '../actions/lobby'

class Lobby extends React.Component {

  componentDidMount() {
    var dispatch = this.props.dispatch
    this.channel = io('/gameRooms')
    this.channel.on('gameRooms', function(grs) {
      dispatch(gameRooms(grs))
    })
    this.channel.on('gameRoom added', function(gr) {
      dispatch(gameRoomAdded(gr))
    })
  }

  createGameRoom() {
    this.channel.emit('create')
  }

  render() {
    const gameRooms = this.props.gameRooms.map(gameRoom => (
      <li key={gameRoom.id}>{gameRoom.name}</li>
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

const mapStateToProps = (state, ownProps) => ({
  gameRooms: state.gameRooms
})
export default connect(mapStateToProps)(Lobby);
