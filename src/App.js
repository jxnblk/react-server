import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import styled from 'styled-components'
import Catch from './Catch'
import FileRoutes from './FileRoutes'

const context = require.context('./pages', true, /\.(js|md|mdx)$/)

const Root = styled.div`
  padding: 32px;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
`

const Routes = () =>
  <Switch>
    <Route
      path='/'
      exact
      render={() => <h1>home</h1>}
    />
  </Switch>

export default () =>
  <Catch>
    <Root>
      <FileRoutes context={context} />
    </Root>
  </Catch>
