const express = require('express');
const router = express.Router();
const db = require('../db');
const { setToken, verifyToken } = require('../auth');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 获取所有帖子的GET端点
router.get('/', verifyToken, (req, res) => {
  let user_id = res.locals.token;
  db.query(`SELECT post.*, user.username, IF(like_post.id, 1, 0) AS liked FROM post INNER JOIN user ON post.user_id = user.id
            LEFT JOIN like_post ON like_post.post_id = post.id and like_post.user_id = ${user_id}`, (err, data) => {
    if (err) res.status(505).json({ err });
    else res.send(data);
  });
});

// 获取特定帖子及其评论的GET端点
router.get('/:id', (req, res) => {
  const post_id = req.params.id;
  const user_id = getPayload(req).user_id; // 假设你有一个函数来获取用户信息

  // 查询以获取特定帖子及其评论
  db.query(`SELECT post.*, user.username, IF(like_post.id, 1, 0) AS liked FROM post INNER JOIN user ON post.user_id = user.id
            LEFT JOIN like_post ON like_post.post_id = post.id and like_post.user_id = ${user_id} WHERE post.id = ${post_id};
            SELECT comment.*, user.username FROM comment JOIN user ON comment.user_id = user.id WHERE comment.post_id = ${post_id}`,
    (err, data) => {
      if (err) res.status(504).json({ err });
      else res.send(data);
    });
});

// 对帖子点赞的POST端点
router.post('/:id/like', verifyToken, (req, res) => {
  const post_id = req.params.id;
  const user_id = res.locals.token;

  // 查询以插入点赞记录并更新帖子的点赞计数
  db.query(`INSERT INTO like_post (post_id, user_id, time) VALUES (${post_id}, ${user_id}, NOW());
            UPDATE post SET likes = likes + 1 WHERE id = ${post_id}`,
    (err) => {
      res.send(true);
    });
});

// 取消对帖子的点赞的POST端点
router.post('/:id/unlike', verifyToken, (req, res) => {
  const post_id = req.params.id;
  const user_id = res.locals.token;

  // 查询以删除点赞记录并更新帖子的点赞计数
  db.query(`DELETE FROM like_post WHERE post_id = ${post_id} AND user_id = ${user_id};
            UPDATE post SET likes = likes - 1 WHERE id = ${post_id}`,
    (err) => {
      res.send(true);
    });
});

// 对帖子添加评论的POST端点
router.post('/:id/comment', verifyToken,(req, res) => {
  let user_id = res.locals.token;
  const post_id = req.params.id;
  const {content} = req.body;
  console.log(post_id,user_id)
  // 查询以插入评论并更新帖子的评论计数
  db.query(`INSERT INTO comment (content, post_id, user_id, time) VALUES ('${content}', ${post_id}, ${user_id}, NOW());
            UPDATE post SET comments = comments + 1 WHERE id = ${post_id}`,
    (err) => {
      if (err) res.status(503).json({ err });
      else res.send(true);
    });
});

// // 获取特定帖子的评论的GET端点
// router.get('/comment/:id', verifyToken, (req, res) => {
//   let post_id = req.params.id;
//   console.log(77777777);

//   // 构建带有JOIN操作的SELECT查询
//   //将user表合并的过程中小心请求泄露用户密码
//   const selectQuery = `
//     SELECT c.*, u.username
//     FROM comment c
//     JOIN user u ON c.user_id = u.user_id
//     WHERE c.post_id = ${post_id};
//   `;

//   // 执行SELECT查询
//   db.query(selectQuery, (err, results) => {
//     if (err) {
//       console.log(88888888, err);
//       res.status(501).json({ err });
//     } else {
//       // 将查询结果作为响应发送
//       res.json(results);
//     }
//   });
// });

// 获取特定帖子的详细信息的GET端点
router.get('/detail/:id', verifyToken, (req, res) => {
  let post_id = req.params.id;

  // 查询以获取特定帖子的详细信息
  db.query(`SELECT * FROM post WHERE id = '${post_id}'`, (err, data) => {
    if (err) res.status(502).json({ err });
    else res.send(data);
  });
});

router.get('/comment/:id', verifyToken, (req, res) => {
  let post_id = req.params.id;

  // 查询以获取特定帖子的详细信息
  db.query(`
  SELECT comment.content, comment.time, user.username
  FROM comment
  INNER JOIN user ON comment.user_id = user.id
  WHERE comment.post_id = ${post_id};
  `, (err, data) => {
    if (err) res.status(508).json({ err });
    else res.send(data);
  });
});
module.exports = router;
