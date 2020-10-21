const express = require('express')
const bodyParser = require('body-parser')
const rootRoute = require('./routes/rootRoute')

const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoute')

const addStore = require('./routes/stores/addStore')
const getStore = require('./routes/stores/getStore')
const editStore = require('./routes/stores/editStore')
const deleteStore = require('./routes/stores/deleteStore')

const addInventory = require('./routes/inventory/addInventory')
const getInventory = require('./routes/inventory/getInventory')
const editInventory = require('./routes/inventory/editInventory')
const deleteInventory = require('./routes/inventory/deleteInventory')

const addBook = require('./routes/books/addBook')
const getBook = require('./routes/books/getBook')
const editBook = require('./routes/books/editBook')
const deleteBook = require('./routes/books/deleteBook')

const addAuthor = require('./routes/authors/addAuthor')
const getAuthor = require('./routes/authors/getAuthor')
const editAuthor = require('./routes/authors/editAuthor')
const deleteAuthor = require('./routes/authors/deleteAuthor')

const app = express()

app.use(express.json())
app.use(rootRoute)

app.use(bodyParser.json())

app.use(addStore)
app.use(getStore)
app.use(editStore)
app.use(deleteStore)

app.use(addInventory)
app.use(getInventory)
app.use(editInventory)
app.use(deleteInventory)

app.use(addBook)
app.use(getBook)
app.use(editBook)
app.use(deleteBook)

app.use(addAuthor)
app.use(getAuthor)
app.use(editAuthor)
app.use(deleteAuthor)

app.use(registerRoute)
app.use(loginRoute)

const port = 3000
app.listen(port, () => {
  console.log(`Backend app is running in http://localhost:${port}`);
})
