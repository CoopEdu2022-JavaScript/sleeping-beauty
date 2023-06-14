const userRouter = require('./user')
const postRouter = require('./feed')
module.exports = app => {
  app.use('/', userRouter)
  app.use('/feed', postRouter)
}