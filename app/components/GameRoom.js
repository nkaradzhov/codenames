import React from 'react';
import {connect} from 'react-redux'
import Messages from './Messages';
import NotFound from './NotFound';

class GameRoom extends React.Component {

  constructor(args) {
    super(args)
    this.emit = this.emit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.socketId && nextProps.user.socketId)
      this.joinRoom(nextProps.user)

    if(!this.props.currentGameRoom.game && nextProps.currentGameRoom.game)
      this.navigateToGame()
  }

  componentDidMount() {
    if (this.props.user.socketId)
      this.joinRoom(this.props.user)
  }

  joinRoom(user) {
    console.log('trying to join game ', user.socketId);
    this.context.channel.emit('join', {
      roomId: this.props.params.roomId,
      player: user
    })
  }

  startGame() {
    this.emit('start game')()
  }

  joinGame() {
    console.log('join game');
    this.navigateToGame()
  }

  navigateToGame() {
    this.props.history.push(`/lobby/${this.props.currentGameRoom.id}/game`)
  }

  emit(event) {
    var channel = this.context.channel
    var rid = this.props.params.roomId
    var pid = this.props.user._id
    return function() {
      channel.emit(event, {
        roomId: rid,
        playerId: pid
      })
    }
  }

  render() {

    if(!this.props.currentGameRoom)
      return <NotFound />

    let observers = []
    let redTell = 'take slot', blueTell = 'take slot', redGuess = 'take slot', blueGuess = 'take slot'
    this.props.currentGameRoom.players.forEach(p => {
      if(p.position === 'observer') observers.push(p)
      if(p.position === 'red-tell') redTell = p.player.name
      if(p.position === 'blue-tell') blueTell = p.player.name
      if(p.position === 'red-guess') redGuess = p.player.name
      if(p.position === 'blue-guess') blueGuess = p.player.name
    })

    return (
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h1 className="panel-title">Contact Form</h1>
          </div>
          <div className="panel-body">
            <Messages />

            <div className ="row">

              <div className="col-sm-4">
                <div className="panel panel-default" onClick={this.emit('become observer')}>
                  <div className="panel-heading">
                    <h3 className="panel-title">Observers</h3>
                  </div>
                  <ul className="list-group">
                    {observers.map(o => <li key={o.player._id} className="list-group-item">{o.player.name}</li>)}
                  </ul>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="panel panel-default" onClick={this.emit('become red-tell')}>
                      <div className="panel-heading">
                        <h3 className="panel-title red">Tell</h3>
                      </div>
                      <div className="panel-body">
                        {redTell}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="panel panel-default" onClick={this.emit('become blue-tell')}>
                      <div className="panel-heading">
                        <h3 className="panel-title blue">Tell</h3>
                      </div>
                      <div className="panel-body">
                        {blueTell}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="panel panel-default" onClick={this.emit('become red-guess')}>
                      <div className="panel-heading">
                        <h3 className="panel-title red">Guess</h3>
                      </div>
                      <div className="panel-body">
                        {redGuess}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="panel panel-default" onClick={this.emit('become blue-guess')}>
                      <div className="panel-heading">
                        <h3 className="panel-title blue">Guess</h3>
                      </div>
                      <div className="panel-body">
                        {blueGuess}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              !!this.props.currentGameRoom.game ?
                <button onClick={this.joinGame.bind(this)} type="button" className="btn btn-primary">Join Game</button> :
                <button onClick={this.startGame.bind(this)} type="button" className="btn btn-primary">Start Game</button>
            }
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
  currentGameRoom: state.gameRooms.filter(room => room.id === ownProps.params.roomId )[0]
})

export default connect(mapStateToProps)(GameRoom);
