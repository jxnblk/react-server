import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import express from 'express'
import App from './App'

const assets = require('../webpack-assets.json')

const app = (req, res) => {
  const sheet = new ServerStyleSheet()
  const body = renderToString(
    sheet.collectStyles(
      <App />
    )
  )

  const styles = sheet.getStyleTags()

  const html = `<!DOCTYPE html>
<html>
<head>
<title>hello</title>
${styles}
</head>
<body>
<div id=root>${body}</div>
<script src='${assets.main.js}'></script>
</body>`

  res.send(html)
}

const server = express()

server.use(express.static('dist/public'))
server.use(app)

export default server
