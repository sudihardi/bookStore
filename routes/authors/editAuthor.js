const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authentication = require('../middleware/authenticationMiddleware')

app.use(authentication)

app.patch("/author", (req, res) => {
    const body = req.body
    const id = req.query.id
    const result = db.edit('authors', req.query.id, body)
    if (result) {
        res.send(result)
    }
    else {
        res.sendStatus(404)
    }
})

module.exports = app