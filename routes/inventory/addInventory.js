const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authentication = require('../middleware/authenticationMiddleware')

app.use(authentication)

app.post("/inventory", (req, res) => {
    const body = req.body;
    const result = db.add('inventories', body);
    res.send(result);
    return;
});

module.exports = app