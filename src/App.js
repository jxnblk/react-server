import React from 'react'
import styled from 'styled-components'
import Head from './Head'

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
    <Head>
      <title>hello</title>
      <link rel='canonical' href='https://github.com/jxnblk/react-server' />
    </Head>
    <h1>hello</h1>
  </Root>
