const express = require('express')
const router = express.Router()
const db = require('../db')
const post_id = 1
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  db.query('SELECT * FROM post', (err, data) => {
    res.send(data)
  })
})

router.post('/editor', (req, res) => {
  try {
    let { title, content, user_id } = req.body
    db.query("INSERT INTO post (title, content, time,comments, user_id) VALUES ('${title}', '${content}', NOW(),0,'${user_id}')",
      [title, content, time, user_id], (err, data) => {
        if (err) res.status(500).json({ err })
        else res.send(true)
      })
  } catch(err){
    console.log(err,"post.js出错")
  }

})


router.get('/detail/:id', (req, res) => {
  let post_id = req.params.id
  db.query('SELECT * FROM post WHERE id = ?', post_id, (err, data) => {
    res.send(data)
  })
})

module.exports = router