const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('sessions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            token: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('sessions')
    },
}


/*a table that stores active sessions

a session is stored in the table when a user logs in, i.e. operation POST /api/login

the existence (and validity) of the session is always checked when the user makes an operation that requires login



a route that allows the user to "log out" of the system,
i.e. to practically remove active sessions from the database, the route can be e.g. DELETE /api/logout
Keep in mind that actions requiring login should not be successful with an "expired token", i.e. with the same token after logging out.
*/