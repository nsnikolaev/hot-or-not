const cors = require('cors')
const express = require('express')
const path = require('path')

const app = new express()

app.use(cors())

app.get(/\/image\/[0-9]{3}\.jpg/, (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../public${req.url}`))
})

app.get('/*', (req, res) => {
  if (req.url === '/') {
    req.url = '/index.html'
  }
  res.sendFile(path.resolve(`${__dirname}/../frontend/dist${req.url}`))
})

app.listen(4000)
console.log('Visit http://localhost:4000')
