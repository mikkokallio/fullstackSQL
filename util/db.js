const { Sequelize } = require('sequelize')
const { PG_DATABASE, PG_HOSTNAME, PG_PASSWORD, PG_USERNAME } = require('./config')

const sequelize = new Sequelize(PG_DATABASE, PG_USERNAME, PG_PASSWORD, {
    host: PG_HOSTNAME,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            //rejectUnauthorized: false
        }
    }
})

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('connected to the database')
    } catch (err) {
        console.log('failed to connect to the database')
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDatabase, sequelize }