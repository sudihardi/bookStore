const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bookModel = require('../model/bookModel')
const authorModel = require('../model/authorModel')
const inventoriesModel = require('../model/inventoriesModel')
const storesModel = require('../model/storesModel')
const userModel = require('../model/userModel')

// ⚠️ propietary code, don't change it ⚠️
// this code will create db.json automatically if your folder doesn't have one
// courious? 👀 search for "IIFE function"
let db;
(async () => {
  try {
    const fs = require('fs')
    const util = require('util')
    const readdir = util.promisify(fs.readdir)
    const path = require('path').resolve()
    const dir = await readdir(path)
    if (!dir.includes('db.json'))
      fs.writeFile(path + 'db.json', '', () => 1)

    const adapter = new FileSync('db.json')
    db = low(adapter)
    db.defaults({
      stores: [],
      inventories: [],
      books: [],
      authors: [],
      users: []
    })
      .write()
  } catch (error) {
    console.log(error);
  }
})()

function shapeObject(input, model) {
  const result = {}
  const modelCounter = model.length
  let counter = 0
  for (const namaKey in input) {
    if (model.includes(namaKey)) {
      result[namaKey] = input[namaKey]
      counter++
    }
  }
  if (counter < modelCounter) {
    return false
  }
  return result
}

function shapedBody(tableName, body) {
  let result
  if (tableName == 'goods') {
    result = shapeObject(body, goodsModel)
  }
  if (tableName == 'inventories') {
    result = shapeObject(body, inventoriesModel)
  }
  if (tableName == 'stores') {
    result = shapeObject(body, storesModel)
  }
  if (tableName == 'users') {
    result = shapeObject(body, userModel)
  }

  if (!result) {
    return false
  }
  return result
}

/**
 * Get data
 * @param {String} tableName table name
 * @returns {Object} data
 */
function get(tableName, query) {
  if (query && Object.keys(query).length) {
    const data = db
      .get(tableName)
      .find(query)
      .value()
    console.log(data);
    return data
  }
  return db
    .get(tableName)
    .value()

}

/**
 * Add data
 * @param {String} tableName table name
 * @param {Object} body inserted data
 */
function add(tableName, body) {
  const checker = shapedBody(tableName, body)
  if (checker) {
    return db.get(tableName)
      .push(checker)
      .write()
  }
}

/**
 * Add a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 * @param {Object} body updated data
 */

/**
 * 
 * @param {id} query atau body  localhost:3000/inv/?id=1 
 * @param {*} id 
 * @param {*} body 
 */


function edit(tableName, id, body) {
  const bodyCheck = body
  bodyCheck.id = id
  const checker = shapedBody(tableName, bodyCheck)
  if (checker) {
    db.get(tableName)
      .find({ id })
      .assign(checker)
      .write()
    return checker
  }
  else {
    return false
  }
}

/**
 * Remove a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function remove(tableName, id) {
  db.get(tableName, id)
    .remove({ id })
    .write()
}

/**
 * Remove all data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function removeAll(tableName) {
  db.get(tableName)
    .remove({})
    .write()
}

module.exports = {
  get,
  add,
  edit,
  remove,
  removeAll
}