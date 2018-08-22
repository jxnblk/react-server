import path from 'path'
import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import styled from 'styled-components'

const req = require.context('./pages', true, /\.(js|md|mdx)$/)

const routes = req.keys().map(key => {
  const extname = path.extname(key)
  const name = path.basename(key, extname)
  const exact = name === 'index'
  const mod = req(key)
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

const Root = styled.div`
  padding: 32px;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
`

export default () =>
  <Root>
    <Switch>
      {routes.map(({ Component, ...route }) => (
        <Route
          {...route}
          render={() => <Component />}
        />
      ))}
      <Route
        render={() => '404'}
      />
    </Switch>
  </Root>
