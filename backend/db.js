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
  

function login(username, password)
{
    //query database for matching entry
    //todo: hashed and salted passwords
    //todo: give the client a token instead of a simple true/false response
    let stat = false;
    let uid = -1;
    console.log(username + " " + password + "\n");
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        console.log("callback is executed");
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
            // Authenticate the user
            stat = true;
            uid = results[0].uid;
        } else {
            stat = false;
        }			
    });
    return uid;
}

function post(uid, title, tag, content)
{
    console.log("uid="+uid+" title=",title);
    const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
  db.query('INSERT INTO post (title, content, tag, time, user_id) VALUES (?, ?, ?, ?, ?)',
    [title, content, tag, time, uid], (err, data) => {
    if (err) return err;
    else return true;
  })
}

function get_detail(id)
{
    db.query('SELECT * FROM post WHERE id = ?', post_id, (err, data) => {
        return data;
      })
}
testDatabaseConnection();
module.exports = {login, post, get_detail};