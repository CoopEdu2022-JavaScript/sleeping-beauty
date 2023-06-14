const express = require('express')
const router = express.Router()
const db = require('../db')
const { setToken, verifyToken } = require('../auth')
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  db.query('SELECT * FROM post', (err, data) => {
    res.send(data)
  })
})

// router.post('/:id/like', (req, res) => {
//   const post_id = req.params.id
//   const user_id = getPayload(req).user_id
//   db.query(`INSERT INTO like_post (post_id, user_id, time) VALUES (${post_id}, ${user_id}, NOW());
//             UPDATE post SET likes = likes + 1 WHERE id = ${post_id}`, (err) => {
//     res.send(true)
//   })
// })


router.get('/detail/:id', (req, res) => {
  let post_id = req.params.id
  db.query('SELECT * FROM post WHERE id = ?', post_id, (err, data) => {
    res.send(data)
  })
})

module.exports = router