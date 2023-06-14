const express = require('express')
const router = express.Router()
const db = require('../db')
const { setToken, verifyToken } = require('../auth')
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  db.query(`SELECT post.*, users.username, IF(like.id, 1, 0) AS liked FROM post INNER JOIN users ON post.user_id = user.id
  LEFT JOIN likes ON likes.post_id = post.id and likes.user_id = ${user_id}`, (err, data) => {
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


router.get('/detail/:id', verifyToken, (req, res) => {
  let post_id = req.params.id
  let user_id = res.locals.token
  db.query( `SELECT post.*, users.username, IF(likes.id, 1, 0) AS liked FROM post INNER JOIN user ON post.user_id = user.id
            LEFT JOIN likes ON like.post_id = post.id and likes.user_id = ${user_id} WHERE post.id = ${post_id};
            SELECT comment.*, users.username FROM comment JOIN user ON comment.user_id = user.id WHERE comment.post_id = ${post_id}`,(err, data) => {
    if (err) res.status(500).json({ err })
    else res.send(data)
  })
})

module.exports = router