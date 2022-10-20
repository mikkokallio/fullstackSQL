const router = require('express').Router()

const { User, Blog, Reading } = require('../models')


router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    })
    res.json(users)
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: ['username', 'name'],
        include: [{
            model: Blog,
            attributes: ['id', 'url', 'title', 'author', 'likes', 'yearWritten'],
        },
        ]
    })
    if (user) {
        if (req.query.read) {
            const result = user.blogs.filter((blog) => blog.reading.read == (req.query.read == 'true' ? true : false))
            res.json({ 'username': user.username, 'name': user.name, 'blogs': result })
        } else {
            res.json(user)
        }
    } else {
        res.status(404).end()
    }
})

/*router.get('/', async (req, res) => {
    const users = await User.findAll({
      include: [
        {
          model: Note,
          attributes: { exclude: ['userId'] }
        },
        {
          model: Team,
          attributes: ['name', 'id'],
        }
      ]
    })
    res.json(users)
  })
*/
router.put('/:username', async (req, res) => {
    //const user = await User.findOne(req.params.username)
    console.log(req.params.username)
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    if (user) {
        user.username = req.body.username
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
})

const errorHandler = (error, req, res, next) => {
    //console.error(error.message)

    if (error.name === 'SequelizeValidationError') {
        return res.status(400).send({ error: 'Username must be a valid email address' })
    }
    return res.status(400).send({ error: 'Something went wrong' })
}

router.use(errorHandler)

module.exports = router