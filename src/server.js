import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from './App'

const server = express()

server.use((req, res) => {
  const body = renderToString(
    <App />
  )

  const html = `<!DOCTYPE html>
  <head>
    <title>hello</title>
  </head>
  <body>
  <div id=root>${body}</div>
  <script src='/main.js'></script>
  </body>`

  res.send(html)
})

export default server
