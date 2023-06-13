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

  let username = req.body.username
  let password = req.body.password
  console.log(req.body);
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, data) => {
    console.log(11111111,username);
    console.log(22222222,data)
    if (data) {
    if (data.length) {
      console.log(3333333,data)
      res.send({
        token: true,
        user_id: data[0].id
      })
    }
    }else console.log("密码错误");
  })
})

router.post('/like', (req, res) => {
  let { content_id } = req.body  // true false
  // to db
  res.send(is_success)
})

router.post('/editor', (req, res) => {
  try {
    let { title, content, user_id } = req.body
    db.query("INSERT INTO post (title, content, time,comments, user_id) VALUES ('${title}', '${content}', NOW(),0,'${user_id}')",
      [title, content, time, user_id], (err, data) => {
        if (err) res.status(500).json({ err })
        else res.send(true)
      })
  } catch {
    console.log(err,"post.js出错")
  }

})


router.get('/detail/:id', (req, res) => {
  let post_id = req.params.id
  res.send(db.get_detail(post_id));
})

router.post('/:id/comment', (req, res) => {
  let post_id = req.params.id
  let { content, user_id } = req.body
  let stat = db.comment(post_id, content, user_id);
  if(stat == true)
  {
    res.send(true);
  }
  else
  {
    res.status(500).json(stat);
  }
})

router.post('/post', (req, res) => {
  let {uid, title, tag, content} = req.body;
  let result = db.post(uid, title,tag, content);
  res.send(result);
})
module.exports = router