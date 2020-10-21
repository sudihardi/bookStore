const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.patch("/store", (req, res) => {
    const body = req.body
    const id = req.query.id
    const result = db.edit('stores', req.query.id, body)
    if (result) {
        res.send(result)
    }
    else {
        res.sendStatus(404)
    }
})

module.exports = app