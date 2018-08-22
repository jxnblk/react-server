import React from 'react'
import { createPortal } from 'react-dom'

export default class Head extends React.Component {
  // didMount = false

  state = {
    didMount: false
  }

  componentDidMount () {
    // this.didMount = true
    this.setState({ didMount: true })
  }

  render () {
    if (!this.state.didMount) return false

    return createPortal(
      this.props.children,
      document.head
    )
  }
}

