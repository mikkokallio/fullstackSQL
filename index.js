require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

//const sequelize = new Sequelize(process.env.DATABASE_URL)

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
    host: process.env.PG_HOSTNAME,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            //rejectUnauthorized: false
        }
    }
})

class Note extends Model { }
Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    important: {
        type: DataTypes.BOOLEAN
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
})

app.post('/api/notes', async (req, res) => {
    try {
        const note = await Note.create(req.body)
        return res.json(note)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

app.post('/api/notes', async (req, res) => {
    console.log(req.body)
    const note = await Note.create(req.body)
    res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})