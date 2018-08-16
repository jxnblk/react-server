import http from 'http'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'


const app = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
	res.setHeader('Access-Control-Allow-Headers', '*')

  const body = renderToString(
    <App />
  )

  const html = `<!DOCTYPE html>
<title>hello</title>
<div id=root>${body}</div>
<script src='http://localhost:3001/main.js'></script>
  `
  res.end(html)
}

const server = http.createServer(app)

server.listen(3000, err => {
  if (err) console.log(err)
  console.log('server listening on port 3000')
})

if (module.hot) module.hot.accept()
