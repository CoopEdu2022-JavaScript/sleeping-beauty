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
  let { username,pwd } = req.body
  res.send(db.login(username,pwd));
})

router.post('/like', (req, res) => {
  let { content_id } = req.body  // true false
  // to db
  res.send(is_success)
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