const userRouter = require('./user')
const postRouter = require('./post')
module.exports = app => {
  app.use('/', userRouter)
  app.use('/feed', postRouter)
}