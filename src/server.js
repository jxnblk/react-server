import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from './App'

const app = (req, res) => {
  const body = renderToString(
    <App />
  )

  const html = `<!DOCTYPE html>
<title>hello</title>
<div id=root>${body}</div>
<script src='http://localhost:3001/main.js'></script>
  `

  res.send(html)
}

const server = express()

server.use(app)

export default server

// if (module.hot) module.hot.accept()
