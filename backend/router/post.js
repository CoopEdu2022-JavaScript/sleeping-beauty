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




router.get('/detail/:id', (req, res) => {
  let post_id = req.params.id
  db.query('SELECT * FROM post WHERE id = ?', post_id, (err, data) => {
    res.send(data)
  })
})

module.exports = router