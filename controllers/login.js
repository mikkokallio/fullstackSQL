const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

router.delete('/', async (req, res) => {
  const authorization = req.get('authorization').substring(7)
  const token = await Session.findOne({
    where: {
      token: authorization
    }
  })

  if (token) {
    await token.destroy()
  } else {
    return res.status(400).json({ error: 'no session' })
  }
})

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  console.log(token)

  await Session.create({ token: token })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router