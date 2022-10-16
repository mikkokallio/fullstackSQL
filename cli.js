require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

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

class Blog extends Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})

async function fetch() {
    const blogs = await Blog.findAll()
    for (blog of blogs) {
        console.log(blog.dataValues.author + ': \'' + blog.dataValues.title + '\', ' + blog.dataValues.likes + ' likes')
    }
}

fetch()