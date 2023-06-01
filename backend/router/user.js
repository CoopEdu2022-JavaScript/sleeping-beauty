const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

const db = require('../db');

router.get('/', (req, res) => {
  res.send('hellaljksdflkajdskljoworld')
})

router.post('/login', (req, res) => {
  let { username, password } = req.body
  res.send(db.login(username, password))
  console.log(db.login(username, password))
})

router.get('/like', (req, res) => {
  let { like } = req.body  // true false
  // to db
  res.send(is_success)
})

router.post('/post', (req, res) => {
  let {uid, title, content} = req.body;
  db.post(uid, title, content);
  res.send(true);
})
module.exports = router