import React from 'react'

const inc = state => ({
  count: state.count + 1
})

export default class extends React.Component {
  state = {
    count: 0
  }

  update = fn => this.setState(fn)

  render () {
    const { count } = this.state
    if (this.props.staticContext) {
      this.props.staticContext.hello = 'hi'
    }
    return (
      <div>
        <h1>index {count}</h1>
        <button onClick={() => this.update(inc)}>+</button>
      </div>
    )
  }
}
