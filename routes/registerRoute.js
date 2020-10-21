const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')

app.post('/register', (req, res) => {
  const result = db.add('users', req.body)
  if(!result) {
    res.status(400).send(result)
  } else {
    res.send(result)
  }
})

// app.get('/register', (req, res) => {
//   res.send("Happy you are here!")
// })

module.exports = app