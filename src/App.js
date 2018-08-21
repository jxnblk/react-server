import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

export default () =>
  <Switch>
    <Route
      exact
      path='/'
      render={() => (
        <h1>hello</h1>
      )}
    />
    <Route
      render={() => '404'}
    />
  </Switch>
