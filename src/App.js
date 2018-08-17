import React from 'react'
import styled from 'styled-components'

// for demonstration only
const Root = styled.div([], {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: '1024px',
  padding: '32px',
  margin: 'auto',
  color: '#222'
})

export default () =>
  <Root>
    <h1>hello</h1>
  </Root>
