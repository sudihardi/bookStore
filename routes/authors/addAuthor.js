const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authentication = require('../middleware/authenticationMiddleware')

app.use(authentication)

app.post("/author", (req, res) => {
    const body = req.body;
    const result = db.add('authors', body);
    res.send(result);
    return;
});

module.exports = app