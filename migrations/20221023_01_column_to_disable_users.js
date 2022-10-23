const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('users', 'disabled', {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('users', 'disabled')
    },
}

/*

a boolean value column in the user table to indicate whether the user is disabled

it is sufficient to disable and enable users directly from the database


*/