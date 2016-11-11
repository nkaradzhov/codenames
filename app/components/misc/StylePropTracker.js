import React from 'react'

class StylePropTracker extends React.Component {

  constructor(args) {
    super(args)
    this.state = {
      more: true
    }
  }

  componentDidMount() {
    var me = this
    window.onresize = function() {
      clearTimeout(me.timeout)
      me.timeout = setTimeout(me.trace.bind(me), me.props.throttle)
    }
    this.trace()
  }

  trace() {
    const element = document.querySelector(this.props.selector)
    if(element) {
      const style = element.currentStyle || window.getComputedStyle(element);
      const value = this.props.select(style)
      this.setState({
        more: value > this.props.max
      })
    }

  }

  render() {
    return this.props.children(this.state.more)
  }

}

export default StylePropTracker
