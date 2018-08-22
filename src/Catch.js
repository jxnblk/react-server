import React from 'react'
import { withRouter } from 'react-router-dom'

export default withRouter(class extends React.Component {
  state = {
    err: null
  }

  componentDidCatch (err) {
    this.setState(err)
  }

  componentDidUpdate (prev) {
    if (!this.state.err) return
    if (prev.children !== this.props.children) {
      this.setState({ err: null })
      if (this.props.staticContext) {
        this.props.staticContext.error = err
      }
    }
  }

  render () {
    const { err } = this.state
    if (err) return err.toString()
    return this.props.children
  }
})
