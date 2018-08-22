import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import express from 'express'
import App from './App'

const server = express()

server.use((req, res) => {
  const router = {}
  const sheet = new ServerStyleSheet()
  const body = renderToString(
    sheet.collectStyles(
      <StaticRouter
        location={req.url}
        context={router}>
        <App />
      </StaticRouter>
    )
  )

  const styles = sheet.getStyleTags()

  const html = `<!DOCTYPE html>
  <html lang='en'>
  <head>
    <meta charset='utf-8'>
    <title>hello</title>
    ${styles}
  </head>
  <body>
  <div id=root>${body}</div>
  <script src='/main.js'></script>
  </body>
  </html>`

  res.send(html)
})

export default server
