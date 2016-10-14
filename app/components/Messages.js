import React from 'react';
import { connect } from 'react-redux'

class Messages extends React.Component {

  handleDismiss() {
    this.props.dispatch({
      type: 'CLEAR_MESSAGES'
    })
  }

  render() {
    const msg = this.props.messages

    if(!msg.success && !msg.error && !msg.info) return null;

    const msgs = msg.success || msg.error || msg.info
    const cls = msg.success ? 'alert-success' : msg.error ? 'alert-danger' : msg.info ? 'alert-info' : ''

    return (
      <div role="alert" className={`alert ${cls} alert-dismissible`}>
       <button type="button" onClick={this.handleDismiss.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {msgs.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Messages);
