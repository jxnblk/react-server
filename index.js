const express = require('express')
const server = require('./dist/server').default

const app = express()

app.use(express.static('dist/public'))
app.use(server)

app.listen(3000, () => {
  console.log('listening on 3000')
})
