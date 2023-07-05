const express = require('express')
const router = express.Router()
const db = require('../db')
const { setToken, verifyToken } = require('../auth')
router.use(express.json())
router.use(express.urlencoded({ extended: true }))


router.get('/', verifyToken, (req, res) => {
  let user_id = res.locals.token
  db.query(`SELECT post.*, user.username, IF(like_post.id, 1, 0) AS liked FROM post INNER JOIN user ON post.user_id = user.id
            LEFT JOIN like_post ON like_post.post_id = post.id and like_post.user_id = ${user_id}`, (err, data) => {
    if (err) res.status(500).json({ err })
    else res.send(data)
  })
})

router.get('/:id', (req, res) => {
  const post_id = req.params.id
  const user_id = getPayload(req).user_id
  db.query(`SELECT post.*, user.username, IF(like_post.id, 1, 0) AS liked FROM post INNER JOIN user ON post.user_id = user.id
            LEFT JOIN like_post ON like_post.post_id = post.id and like_post.user_id = ${user_id} WHERE post.id = ${post_id};
            SELECT comment.*, user.username FROM comment JOIN user ON comment.user_id = user.id WHERE comment.post_id = ${post_id}`  , (err, data) => {
    if (err) res.status(500).json({ err })
    else res.send(data)
  })
})

router.post('/:id/like',verifyToken, (req, res) => {
  const post_id = req.params.id
  const user_id = res.locals.token
  db.query(`INSERT INTO like_post (post_id, user_id, time) VALUES (${post_id}, ${user_id}, NOW());
            UPDATE post SET likes = likes + 1 WHERE id = ${post_id}`, (err) => {
    res.send(true)
  })
})

router.post('/:id/unlike',verifyToken, (req, res) => {
  const post_id = req.params.id
  const user_id = res.locals.token
  db.query(`DELETE FROM like_post WHERE post_id = ${post_id} AND user_id = ${user_id};
            UPDATE post SET likes = likes - 1 WHERE id = ${post_id}`, (err) => {
    res.send(true)
  })
})


router.post('/:id/comment', (req, res) => {
  const post_id = req.params.id
  const { content, user_id } = req.body
  db.query(`INSERT INTO comment (content, post_id, user_id, times) VALUES ('${content}', ${post_id}, ${user_id}, NOW());
            UPDATE post SET comments = comments + 1 WHERE id = ${post_id}`, (err) => {
    if (err) res.status(500).json({ err })
    else res.send(true)
  })
})


router.get('/:id/comment', verifyToken, (req, res) => {
  let user_id = res.locals.token;
  let post_id = req.params.id;

  // Construct the SELECT query with JOIN operation
  const selectQuery = `
    SELECT c.user_name, c.content, c.time, u.username
    FROM comment AS c
    INNER JOIN user AS u ON c.user_id = u.id
    WHERE c.post_id = ${post_id} AND c.user_id = ${user_id}
  `;

  // Execute the SELECT query
  db.query(selectQuery, (err, results) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      // Send the query results as response
      res.json(results);
    }
  });
});




router.get('/detail/:id', verifyToken, (req, res) => {
  let post_id = req.params.id
  let user_id = res.locals.token
  db.query( `SELECT * FROM post WHERE id = '${post_id}' AND user_id = '${user_id}'`,(err, data) => {
    if (err) res.status(500).json({ err })
    else res.send(data)
  })
})

module.exports = router