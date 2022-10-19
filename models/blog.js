const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

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
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    yearWritten: {
        type: DataTypes.INTEGER,
        validate: {
            checkYear(value) {
                if (value < 1991 || value > new Date().getFullYear()) {
                    throw new Error("The year is not correct!");
                }
            },
        }
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})

module.exports = Blog

/*Expand your application (by migration) 
so that the blogs have a year written attribute, 
i.e. a field year which is an integer 
at least equal to 1991 but not greater 
than the current year. 
Make sure the application gives an appropriate 
error message if an incorrect value 
is attempted to be given for a year written.*/