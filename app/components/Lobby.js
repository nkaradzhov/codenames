import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router';
import Messages from './Messages'

class Lobby extends React.Component {

  createGameRoom() {
    this.context.channel.emit('create')
  }

  roomPlayers(players) {
    return players.map(p => {
      const color = p.position === 'observer'? 'label-default'
      : p.position.indexOf('red') > -1 ? 'label-danger'
      : 'label-primary'
      return <span key={p.player._id} style={{'marginRight':'.5em'}} className={`label ${color}`}>{p.player.name}</span>
    })
  }

  render() {

    const gameRooms = (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Players</th>
          </tr>
        </thead>
        <tbody>
          {this.props.gameRooms.map((r,i) =>
            <tr key={r.id}>
              <th>{i}</th>
              <td>
                <Link to={`/lobby/${r.id}`}>
                  {r.name}
                </Link>
              </td>
              <td>{this.roomPlayers(r.players)}</td>
            </tr>
          )}
        </tbody>
      </table>
    )

    return (
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">Lobby</h3>
          </div>
          <div className="panel-body">
            <Messages />
            {gameRooms}
            <button type="button" className="btn btn-primary" onClick={this.createGameRoom.bind(this)}>Create Game Room</button>
          </div>
        </div>
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
