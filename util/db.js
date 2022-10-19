const { Sequelize } = require('sequelize')
const { PG_DATABASE, PG_HOSTNAME, PG_PASSWORD, PG_USERNAME } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

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

const migrationConf = {
    migrations: {
        glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
}

const runMigrations = async () => {
    const migrator = new Umzug(migrationConf)
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    })
}
const rollbackMigration = async () => {
    await sequelize.authenticate()
    const migrator = new Umzug(migrationConf)
    await migrator.down()
}

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log('connected to the database')
    } catch (err) {
        console.log('failed to connect to the database')
        console.log(err)
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }