const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')

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

module.exports = router