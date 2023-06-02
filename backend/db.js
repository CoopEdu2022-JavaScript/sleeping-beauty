const express = require('express')
const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'msa_db'
})

function login(username, password)
{
    //query database for matching entry
    //todo: hashed and salted passwords
    //todo: give the client a token instead of a simple true/false response
    let stat = false;
    console.log(username + " " + password + "\n");
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        console.log("callback is executed");
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
            // Authenticate the user
            stat = true;
        } else {
            stat = false;
        }			
    });
    return stat;
}

function post(uid, title, content)
{
    console.log("uid="+uid+" title=",title);
    const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
  db.query('INSERT INTO post (title, content, time, user_id) VALUES (?, ?, ?, ?)',
    [title, content, time, uid], (err, data) => {
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

module.exports = {login, post, get_detail};