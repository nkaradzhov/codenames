import React from 'react';
import { connect } from 'react-redux'

class Socket extends React.Component {

  getChildContext() {
    if(!this.channel)
      this.channel = io('/gameRooms')
    return {
      channel: this.channel
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

Socket.childContextTypes = {
  channel: React.PropTypes.object
}

export default connect(mapStateToProps)(Socket);
