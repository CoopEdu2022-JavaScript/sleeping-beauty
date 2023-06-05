const express = require('express')
const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lala050502',
    database: 'test'
})

function testDatabaseConnection() {
    connection.connect((error) => {
      if (error) {
        console.error('Failed to connect to the database:', error);
      } else {
        console.log('Successfully connected to the database.');
      }
    });
  }
  let db = mysql.createConnection(connection)

  module.exports = db
testDatabaseConnection()