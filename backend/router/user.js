const express = require('express')
const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))
const { setToken, verifyToken } = require('../auth')
const db = require('../db');

router.get('/', (req, res) => {
  res.send(req.headers.authorization)
})

//if success, returns uid, else returns -1
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`, (err, data) => {
    if (data.length) {
      const user_id = data[0].id
      const token = setToken({ user_id })
      res.send({ code: 0, msg: 'success!', user_id: user_id, token: token });
    } else {
      res.send({ code: 1, msg: 'wrong username or password!' });
    }
  })
})

router.post('/editor', verifyToken, (req, res) => {
  let user_id = res.locals.token
  let title = req.body.title
  let content = req.body.content
  let tag = req.body.tag
  console.log(title, content)
  console.log(user_id)
  db.query(`INSERT INTO post (title, content, user_id, times,tag) VALUES ('${title}', '${content}', ${user_id}, NOW(),'${tag}')`, (err) => {
    if (err) res.status(500).json({ err })
    else res.send(true)
  })
})



// router.get('/profile/:id', verifyToken, (req, res) => {
//   let user_id = req.params.id
//   if (user_id != req.locals.token) {
//     return res.send()
//   }
//   db.query(`SELECT * FROM user WHERE id = ${user_id}`, (err, data) => {
//     if (data) data.forEach(info => delete info.password);
//     res.send(data)
//   })
// })

router.post('/like', (req, res) => {
  let { content_id } = req.body  // true false
  // to db
  res.send(is_success)
})




router.get('/detail/:id', (req, res) => {
  let post_id = req.params.id
  res.send(db.get_detail(post_id));
})

router.get('/', (req, res) => {
  res.send(req.headers.authorization)
})

router.post('/:id/comment', (req, res) => {
  let post_id = req.params.id
  let { content, user_id } = req.body
  let stat = db.comment(post_id, content, user_id);
  if (stat == true) {
    res.send(true);
  }
  else {
    res.status(500).json(stat);
  }
})

router.post('/post', (req, res) => {
  let { uid, title, tag, content } = req.body;
  let result = db.post(uid, title, tag, content);
  res.send(result);
})
module.exports = router