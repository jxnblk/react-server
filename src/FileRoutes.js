import React from 'react'
import path from 'path'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

class FileRoutes extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    const { context } = props
    this.routes = context.keys().map(key => {
      const extname = path.extname(key)
      const name = path.basename(key, extname)
      const exact = name === 'index'
      const mod = context(key)
      const Component = mod.default
      if (typeof Component !== 'function') return null
      if (/^_/.test(name)) return null
      return {
        key,
        name,
        extname,
        exact,
        path: '/' + (exact ? '' : name),
        module: mod,
        Component,
      }
    })
    .filter(Boolean)
  }

  render () {
    return (
      <Switch>
        {this.routes.map(({
          key,
          path,
          exact,
          Component,
        }) => (
          <Route
            key={key}
            path={path}
            exact={exact}
            component={Component}
          />
        ))}
        <Route render={() => '404'} />
      </Switch>
    )
  }
}

export default FileRoutes
