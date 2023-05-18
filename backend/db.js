const express = require('express')
const mysql = require('mysql')

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'msa_db'
})

function login(username, password)
{
    return true;
}

function post(uid, title, content)
{
    console.log("uid="+uid+" title=",title);
}

module.exports = {login, post};