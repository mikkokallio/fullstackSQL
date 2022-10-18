const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: ['author',
            [sequelize.fn('count', sequelize.col('id')), 'blogs'],
            [sequelize.fn('sum', sequelize.col('likes')), 'likes']
        ],
        group: [['author']],
    }).catch(e => console.log(e))

    res.json(authors)
})

module.exports = router