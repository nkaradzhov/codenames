// import React from 'react';
//
// import { connect } from 'react-redux'
//
// class GameTurn extends React.Component {
//
//   constructor() {
//     super()
//     this.getCurrentPlayerName = this.getCurrentPlayerName.bind(this)
//   }
//
//   getCurrentPlayerName() {
//     const player = this.props.session.players.filter(player =>
//       player.slot === this.props.session.game.turn
//     )[0]
//     return player ? player.name : ''
//   }
//
//   render() {
//     let msg = this.props.player.slot === this.props.session.game.turn ?
//       'Your turn to ' :
//       `${this.getCurrentPlayerName()}\`s turn to `
//
//     msg += this.props.session.game.turn.indexOf('tell') > -1 ?
//       'hint.' : 'guess.'
//
//     return (
//       <h1 style={{textAlign: 'center'}}>{ msg }</h1>
//     )
//   }
//
// }
//
// const mapStateToProps = (state, ownProps) =>
//   ({
//     player: state.player,
//     session: state.currentSession
//   })
//
// GameTurn = connect(mapStateToProps)(GameTurn);
// export default GameTurn;
