const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 配置解析body的中间件
app.use(bodyParser.urlencoded({ extended: false }));

// 创建与MySQL数据库的连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase',
});

// 连接MySQL数据库
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// 创建路由
app.get('/', (req, res) => {
  res.send('Welcome to the login page!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 查询用户是否存在
  const sql = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      res.status(401).send('Invalid username or password');
    } else {
      res.send(`Welcome, ${result[0].username}!`);
    }
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
