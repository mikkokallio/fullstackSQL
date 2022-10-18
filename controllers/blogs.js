const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { SECRET } = require('../util/config')

const { Blog, User } = require('../models')

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

router.get('/', async (req, res) => {
    let search = req.query.search
    let condition = null
    if (search) {
        condition = {
            [Op.or]: [
                {
                    title: {
                        [Op.substring]: search
                    }
                },
                {
                    author: {
                        [Op.substring]: search
                    }
                }
            ]
        }    
    }

    const blogs = await Blog.findAll({
        order: [['likes', 'DESC']],
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where: condition
    })

    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

router.get('/:id', blogFinder, errorHandler, async (req, res) => {
    res.json(req.blog)
})

router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.delete('/:id', blogFinder, tokenExtractor, errorHandler, async (req, res) => {
    if (req.decodedToken.username == req.blog.toJSON().user.username) {
        await req.blog.destroy()
    } else {
        return res.status(400).json({ error: 'only user who added the blog can delete it' })
    }
})

router.put('/:id', blogFinder, errorHandler, async (req, res) => {
    req.blog.likes = parseInt(req.body.likes)
    await req.blog.save()
    res.json(req.blog)
})

module.exports = router