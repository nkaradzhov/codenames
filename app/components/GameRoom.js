import React from 'react';
import {connect} from 'react-redux'
import {gameRooms, gameRoomAdded, gameRoomPlayers} from '../actions/socketapi'
import Messages from './Messages';

class GameRoom extends React.Component {

  componentDidMount() {
    this.context.channel.emit('join', {
      roomId: this.props.params.roomId,
      player: this.props.user
    })
  }

  render() {
    const currentGameRoom = this.props.gameRooms.filter(room => room.id === this.props.params.roomId)[0]
    const players = currentGameRoom ? currentGameRoom.players : []
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h1 className="panel-title">Contact Form</h1>
          </div>
          <div className="panel-body">
            <Messages />
            {players.map(p=> <p key={p.player._id}>{p.player.name} {p.position}</p>)}
          </div>
        </div>
      </div>
    );
  }
}


GameRoom.contextTypes = {
  channel: React.PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  gameRooms: state.gameRooms
})

export default connect(mapStateToProps)(GameRoom);
