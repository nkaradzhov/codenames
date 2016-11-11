import React from 'react'
import { connect } from 'react-redux'
import { gameRooms, gameRoomAdded, gameRoomUpdated, gameRoomKilled, gameUpdated, playerLinked, gamePosition, apiError } from '../actions/socketapi'


class SocketApi extends React.Component {
  constructor(args) {
    super(args)
    this.linked = false
    this.channel = io('/gameRooms')
    this.channel.on('rooms', rooms => this.props.dispatch(gameRooms(rooms)))
    this.channel.on('room added', room => this.props.dispatch(gameRoomAdded(room)))
    this.channel.on('room updated', this.updateRoom.bind(this))
    this.channel.on('room killed', id => this.props.dispatch(gameRoomKilled(id)))
    this.channel.on('game updated', obj => this.props.dispatch(gameUpdated(obj)))
    this.channel.on('warn', error => this.props.dispatch(apiError(error)))
    this.channel.on('connect', _ => this.props.dispatch(playerLinked(`/gameRooms#${this.channel.io.engine.id}`)))
  }

  updateRoom(room) {
    this.props.dispatch(gameRoomUpdated(room))
    const pos = this.findMyPosition(this.props.state.auth.user._id, room)
    if (pos && this.props.state.gamePositions[room.id] != pos)
      this.props.dispatch(gamePosition(room.id, pos))
  }

  findMyPosition(pid, room) {
    const p = room.players.filter(p => p.player._id === pid)[0]
    return p ? p.position : undefined
  }

  getChildContext() {
    return {
      channel: this.channel
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

SocketApi.childContextTypes = {
  channel: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(SocketApi);
