const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

User.hasMany(Blog)
Blog.belongsTo(User)
//Blog.sync({ alter: true })
//User.sync({ alter: true })

//User.belongsToMany(Blog, { through: Reading })
Blog.belongsToMany(User, { through: Reading })
module.exports = {
  Blog, User, Reading
}