import React from 'react'
import {
  renderToString,
  renderToStaticMarkup
} from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import express from 'express'
import App from './App'
import { HeadProvider } from './Head'

const assets = require('../webpack-assets.json')

const app = (req, res) => {
  const headTags = []
  const sheet = new ServerStyleSheet()
  const body = renderToString(
    sheet.collectStyles(
      <HeadProvider tags={headTags}>
        <App />
      </HeadProvider>
    )
  )

  const head = renderToStaticMarkup(headTags)
  const styles = sheet.getStyleTags()

  const html = `<!DOCTYPE html>
<html>
<head>
${head}
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
