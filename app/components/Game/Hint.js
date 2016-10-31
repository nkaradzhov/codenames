import React from 'react'

class Hint extends React.Component {

  constructor(args) {
    super(args)
    this.state = {
      count: 0
    }
  }

  increment() {
    this.setState(Object.assign({}, this.state, {
      count: this.state.count < 10 ? this.state.count +1 : 10
    }))
  }

  decrement() {
    this.setState(Object.assign({}, this.state, {
      count: this.state.count > 0 ? this.state.count - 1 : 0
    }))
  }

  updateHint(event) {
    this.setState(Object.assign({}, this.state, {
      hint: event.target.value
    }))
  }

  render() {

    const inc = this.state.count > 9 ? true : false
    const dec = this.state.count === 0 ?  true : false
    const hasHint = this.state.hint && this.state.hint.length > 0

    const represent = this.state.count === 10 ? 'inf' : this.state.count

    return (
      <div className="middle-box">
        <form className="form-inline">
          <div className="form-group">
            <input onKeyUp={this.updateHint.bind(this)} type="text" className="form-control" placeholder="Hint"/>
            <div className="btn-group">
              <button onClick={this.decrement.bind(this)} type="button" disabled={dec} className="btn btn-default">-</button>
              <button type="button" className="btn btn-default" disabled>{represent}</button>
              <button onClick={this.increment.bind(this)} type="button" disabled={inc} className="btn btn-default">+</button>
            </div>
            <button type="button" onClick={()=> this.props.onHint(this.state)} className="btn btn-primary" disabled={!hasHint}>Hint</button>
          </div>
        </form>
      </div>
    )
  }

}

export default Hint;
