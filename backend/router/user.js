const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

const db = require('../db');

router.get('/', (req, res) => {
  res.send('hellaljksdflkajdskljoworld')
})

//if success, returns uid, else returns -1
router.post('/login', (req, res) => {
  let { username, password } = req.body
  db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, data) => {
    if (data.length) res.send({
      token: true,
      user_id: data[0].id
    })
  })
})

router.post('/like', (req, res) => {
  let { content_id } = req.body  // true false
  // to db
  res.send(is_success)
})


router.get('/detail/:id', (req, res) => {
  let post_id = req.params.id
  return db.get_detail(post_id);
})

router.post('/post', (req, res) => {
  let {uid, title, tag, content} = req.body;
  let result = db.post(uid, title,tag, content);
  res.send(result);
})
module.exports = router