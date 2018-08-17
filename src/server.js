import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from './App'

const assets = require('../webpack-assets.json')

const app = (req, res) => {
  const body = renderToString(
    <App />
  )

  const html = `<!DOCTYPE html>
<title>hello</title>
<div id=root>${body}</div>
<script src='${assets.main.js}'></script>
  `

  res.send(html)
}

const server = express()

server.use(express.static('public'))
server.use(app)

export default server
