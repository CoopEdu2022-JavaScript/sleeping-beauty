const express = require('express')
const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lala050502',
    database: 'test'
})

db.query("SELECT username, password FROM users;", (err, data) => {
    if (err) {
        console.log("error!", err);
    } else {
        console.log("success!", data);

        // 在成功后进行数据核对
        const username = "desiredUsername";
        const password = "desiredPassword";
        const foundUser = data.find(user => user.username === 'uid');


        if (foundUser) {
            console.log("Credentials matched!");  // 用户名和密码匹配
            return true;
        } else {
            console.log("Invalid credentials.");  // 用户名和密码不匹配
            return false;
        }
    }
});
