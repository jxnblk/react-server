import express from 'express'
import server from './server'

const app = express()

app.use(express.static('dist/public'))
app.use(server)

app.listen(3000, err => {
  if (err) console.log(err)
  console.log('server listening on port 3000')
})

