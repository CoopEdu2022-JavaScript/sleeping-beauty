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
// db.query("INSERT INTO post (title, content, time,comments, user_id) VALUES ('${title}', '${content}', NOW(),0,'${user_id}')",
//       ['31221321', '3434234', 432432423], (err) => {
//         console.log(1111122222)
//       })

// const jwt_auth = require('./auth/index')
// const login = (username, password) => {
//   //query database for matching entry
//   //todo: hashed and salted passwords
//   console.log(username, password)
//   db.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, data) => {
//     if (data.length) {
//       const user_id = data[0].id
//       console.log(user_id, 999)
//       // const token = setToken({ user_id })
//       // return { code: 0, msg: 'success!', user_id: user_id, token: token };
//       return { code: 0, msg: 'success!', user_id:user_id};
//     } else {
//       return { code: 1, msg: 'wrong username or password!' };
//     }
//   })/*<——在查询内*/
// }
// 这个函数无法传出数据
// function post(uid, title, content)
// {
//     console.log("uid="+uid+" title=",title);
//     const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
//     db.query('INSERT INTO post (title, content, time, user_id) VALUES (?, ?, ?, ?)',
//     [title, content, time, uid], (err, data) => {
//     if (err) return err;
//     else return true;
//   })
// }

// function comment(post_id, content, user_id)
// {
//     db.query(`INSERT INTO comment (content, post_id, user_id, time) VALUES ('${content}', ${post_id}, ${user_id}, NOW());
//             UPDATE post SET comments = comments + 1 WHERE id = ${post_id}`, (err) => {
//     if (err) return err;
//     else return true;
//     })
// }
// function get_detail(id)
// {
//     db.query('SELECT * FROM post WHERE id = ?', post_id, (err, data) => {
//         return data;
//     })
// }

// module.exports = {login, post, comment, get_detail};
module.exports = mysql.createConnection(dbConfig);


// //以下是接口
// router.post('/login', (req, res) => {
//   // console.log(req.body)
//   let { uid, pwd } = req.body
//   console.log(db.login(uid, pwd))
//   res.send(db.login(uid,pwd));
// })