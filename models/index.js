const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

User.hasMany(Blog)
Blog.belongsTo(User)
//Blog.sync({ alter: true })
//User.sync({ alter: true })

module.exports = {
  Blog, User, Reading
}