import React from 'react';
import {connect} from 'react-redux'
import {gameRooms, gameRoomAdded, gameRoomPlayers} from '../actions/lobby'

class GameRoom extends React.Component {

  componentDidMount() {
    const dispatch = this.props.dispatch
    this.context.channel.emit('joinRoom', {
      roomId: this.props.params.roomId,
      player: this.props.user
    })
    this.context.channel.on('players', function(players) {
      dispatch(gameRoomPlayers(players))
    })
  }

  render() {
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h1 className="panel-title">Contact Form</h1>
          </div>
          <div className="panel-body">
            {this.props.currentGameRoom.players.observers.map(function(p){
              return <p key={p._id}>{p.name}</p>
            })}
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
  currentGameRoom: state.currentGameRoom
})

export default connect(mapStateToProps)(GameRoom);
