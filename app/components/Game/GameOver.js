import React from 'react';

class GameOver extends React.Component {

  render() {
    return (
      <h1>You {this.props.win}!</h1>
    )
  }

}

export default GameOver;
