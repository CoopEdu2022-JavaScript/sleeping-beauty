// backend/auth/index.js

const jwt = require('jsonwebtoken');

const jwtConfig = {
  secretKey: 'you_shell_not_pass!!', // JWT signing key
  algorithm: 'HS256', // encryption algorithm
  expiresIn: '1h'  // expire time
}

const setToken = (payload) => {
  return jwt.sign(
    payload,
    jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
    algorithm: jwtConfig.algorithm
  })
}

const decodeJwt = (req) => {
  try {
    const [authHead, token] = req.headers.authorization.split(' ')
    if (authHead == 'Bearer') {
      return jwt.verify(token, jwtConfig.secretKey)
    }
  } catch (error) {
    return console.log(error)
  }
}

const verifyToken = (req, res, next) => {
  const token = decodeJwt(req)
  if (!token) {
    res.status(401).send('Unauthorized')
  } else {
    res.locals.token = token.user_id
    next()
  }
}


module.exports = { setToken, verifyToken }