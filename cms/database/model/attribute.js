const {
    DB,
    Sequelize
} = require('../sequelize')
const AttributeModel = DB.define('attribute', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        defaultValue: 'text',
        allowNull: false
    }
}, {
    timestamps: false
})
module.exports = AttributeModel;