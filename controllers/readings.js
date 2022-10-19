const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { SECRET } = require('../util/config')

const { Blog, User, Reading } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id, {
        include: {
            model: User,
            attributes: ['username']
        }
    })
    if (req.blog) {
        next()
    } else {
        next({ "message": "malformatted id" })
    }
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        //console.log(authorization.substring(7))
        //console.log(SECRET)
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch {
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    //if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
    //}
}

router.post('/', async (req, res) => {
    try {
        const user = await User.findByPk(req.body.userId)
        const blog = await Blog.findByPk(req.body.blogId)
        if (user && blog) {
            const reading = await Reading.create({ blog_id: blog.id, user_id: user.id })
            return res.json(reading)
        } else {
            console.log('nöy!')
            //Error('Not found!')
        }

        
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error })
    }
})

/*router.put('/:id', blogFinder, errorHandler, async (req, res) => {
    req.blog.likes = parseInt(req.body.likes)
    await req.blog.save()
    res.json(req.blog)
})*/

module.exports = router