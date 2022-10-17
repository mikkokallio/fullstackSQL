const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)//.catch(error => next(error))
    if (req.blog) {
        next()
    } else {
        next({"message": "malformatted id"})    
    }
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    //if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    //}
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    //console.log(notes.map(n=>n.toJSON()))
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

router.get('/:id', blogFinder, errorHandler, async (req, res) => {
    res.json(req.blog)
})

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.delete('/:id', blogFinder, errorHandler, async (req, res) => {
    await req.blog.destroy()
})

router.put('/:id', blogFinder, errorHandler, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})

module.exports = router