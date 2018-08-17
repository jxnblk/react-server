import React from 'react'
import { createPortal } from 'react-dom'

const { Provider, Consumer } = React.createContext({
  push: () => {}
})

export class HeadProvider extends React.Component {
  static defaultProps = {
    tags: []
  }

  push = (elements) => {
    this.props.tags.push(
      ...elements
    )
  }

  render () {
    const context = {
      push: this.push
    }

    return (
      <Provider value={context}>
        {this.props.children}
      </Provider>
    )
  }
}

export class Head extends React.Component {
  state = {
    didMount: false
  }

  rehydrate = () => {
    const nodes = [
      ...document.head.querySelectorAll('[data-head]')
    ]
    nodes.forEach(node => {
      console.log(node)
      // node.remove()
    })
  }

  componentDidMount () {
    this.setState({ didMount: true })
    // this.rehydrate()
  }

  render () {
    const children = React.Children.toArray(this.props.children)
      .map(child => React.cloneElement(child, { 'data-head': true }))
    const { didMount } = this.state

    if (!didMount) {
      return (
        <Consumer
          children={({ push }) => {
            push(children)
            return false
          }}
        />
      )
    }

    return false
    return createPortal(
      children,
      document.head
    )
  }
}

export default Head
