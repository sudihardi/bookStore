const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.get("/store", (req, res) => {
    res.send(db.get('stores'))
});

module.exports = app