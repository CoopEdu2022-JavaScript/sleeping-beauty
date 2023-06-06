const express = require('express')
const mysql = require('mysql')


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Lala050502',
  database: 'test',
  multipleStatements: true  // enable multiple sql in one query
}

let db = mysql.createConnection(dbConfig)

module.exports = db


