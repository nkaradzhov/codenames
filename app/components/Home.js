import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import { Link } from 'react-router';

const username = user => user && user.name || 'stranger'

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages}/>
        <div className="row">
        <div className="jumbotron jumbotron-image">
          <div className="container">
            <h1>Hello, {username(this.props.user)}!</h1>
            <p>...</p>
            <p><Link className="btn btn-primary btn-lg" to="/lobby" role="button">Go to the Lobby</Link></p>
          </div>
        </div>
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Game Overview</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                  mollis euismod. Donec sed odio dui.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Gameplay</h3>
                <p>
                    If you are the spymaster, you are trying to think of a one-word clue that relates to some of the words
                    your team is trying to guess. When you think you have a good clue, you say it. You also say one
                    number, which tells your teammates how many codenames are related to your clue.
                    Example: Two of your words are NUT and BARK. Both of these grow on trees, so you say tree: 2.
                    You are allowed to give a clue for only one word (cashew: 1) but its fun to try for two or more. Getting
                    four words with one clue is a big accomplishment.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Game Flow</h3>
                <p>
                  Spymasters take turns giving clues. After
                  a spymaster gives a clue, his or her team starts
                  guessing. Their turn ends when they guess
                  wrong, when they decide to stop, or when they
                  have made the maximum number of guesses
                  for that clue. Then it is the other teams turn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Home);
