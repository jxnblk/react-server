import http from 'http'
import app from './server'

const server = http.createServer(app)

let current = app

server.listen(3000, err => {
  if (err) console.log(err)
  console.log('server listening on port 3000')
})

if (module.hot) {
  module.hot.accept('./server.js', () => {
    console.log('server reload')
    server.removeListener('request', current)
    const next = require('./server').default
    server.on('request', next)
    current = next
  })
}
