import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import styled from 'styled-components'

const Root = styled.div`
  padding: 32px;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
`

export default () =>
  <Root>
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
  </Root>
