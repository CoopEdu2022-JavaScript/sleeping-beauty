const express = require('express')
const mysql = require('mysql')


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Lala050502',
  database: 'msa_db',
  multipleStatements: true  // enable multiple sql in one query
}

let db = mysql.createConnection(dbConfig)
module.exports = mysql.createConnection(dbConfig);

const post_id = 1; // 你要获取的 post_id 值
const content = "你好";
const user_id = 2;

const query = `
  INSERT INTO comment (content, post_id, user_id, time) VALUES (?, ?, ?, NOW());
  UPDATE post SET comments = comments + 1 WHERE id = ?;
`;

db.query(query, [content, post_id, user_id, post_id], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Query results:', results);
});

// db.query(`SELECT post.*, user.username, IF(likes.id, 1, 0) AS liked FROM post INNER JOIN user ON post.user_id = user.id
// LEFT JOIN likes ON like.post_id = post.id and likes.user_id = 3 WHERE id = 30`, (err,data) => {
//         console.log(data)
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



// //以下是接口
// router.post('/login', (req, res) => {
//   // console.log(req.body)
//   let { uid, pwd } = req.body
//   console.log(db.login(uid, pwd))
//   res.send(db.login(uid,pwd));
// })