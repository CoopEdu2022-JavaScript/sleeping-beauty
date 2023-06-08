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

const jwt_auth = require('./auth/index')
function login(username, password)
{
    //query database for matching entry
    //todo: hashed and salted passwords   
    db.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`, (err, data) => {
        if (data.length) {
            const user_id = data[0].id
            const token = setToken({ user_id })
            return { code: 0, msg: 'success!', user_id: user_id, token: token };
        } else {
            return { code: 1, msg: 'wrong username or password!' };
        }
    })
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

function comment(post_id, content, user_id)
{
    db.query(`INSERT INTO comment (content, post_id, user_id, time) VALUES ('${content}', ${post_id}, ${user_id}, NOW());
            UPDATE post SET comments = comments + 1 WHERE id = ${post_id}`, (err) => {
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

module.exports = {login, post, comment, get_detail};