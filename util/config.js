require('dotenv').config()

module.exports = {
    SECRET: 'sdflk',
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_USERNAME: process.env.PG_USERNAME,
    PG_HOSTNAME: process.env.PG_HOSTNAME,
    PG_DATABASE: process.env.PG_DATABASE,
    PORT: process.env.PORT || 3001,
}