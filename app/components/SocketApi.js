import React from 'react'
import { connect } from 'react-redux'
import { gameRooms, gameRoomAdded, gameRoomUpdated, gameUpdated, apiError } from '../actions/socketapi'


class SocketApi extends React.Component {
  constructor(args) {
    super(args)
    this.linked = false
    this.channel = io('/gameRooms')
    this.channel.on('rooms', rooms => this.props.dispatch(gameRooms(rooms)))
    this.channel.on('room added', room => this.props.dispatch(gameRoomAdded(room)))
    this.channel.on('room updated', room => this.props.dispatch(gameRoomUpdated(room)))
    this.channel.on('game updated', obj => this.props.dispatch(gameUpdated(obj)))
    this.channel.on('warn', error => this.props.dispatch(apiError(error)))
    this.channel.on('connect', _ =>
      this.props.dispatch({
        type: 'PLAYER_LINKED',
        socketId: `/gameRooms#${this.channel.io.engine.id}`
      })
    )
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
