import React from 'react'
import {
  renderToString,
  renderToNodeStream,
  renderToStaticMarkup
} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import express from 'express'
import App from './App'

const server = express()

const Head = ({
  title = 'hello'
}) =>
  <head>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width,initial-scale=1' />
    <title>{title}</title>
  </head>

server.use((req, res) => {
  const router = {}
  const sheet = new ServerStyleSheet()
  res.write('<!DOCTYPE html><html>')
  const head = renderToStaticMarkup(
    <Head />
  )
  res.write(head)
  res.write('<body><div id=root>')

  const app = sheet.collectStyles(
    <StaticRouter
      location={req.url}
      context={router}>
      <App />
    </StaticRouter>
  )

  const stream = sheet.interleaveWithNodeStream(
    renderToNodeStream(app)
  )

  stream.pipe(res, { end: false })
  stream.on('end', () => {
    console.log('router', router)
    res.end(`</div><script src='/main.js'></script></body></html>`)
  })
})

export default server
