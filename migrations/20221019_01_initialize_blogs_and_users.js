const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year_written', {
            type: DataTypes.INTEGER,
            validate: {
                checkYear(value) {
                    if (value < 1991 || value > new Date().getFullYear()) {
                        throw new Error("The year is not correct!");
                    }
                },
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year_written')
    },
}