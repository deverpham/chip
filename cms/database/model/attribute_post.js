const {
    DB,
    Sequelize
} = require('../sequelize')
const attrPostModel = DB.define('attribute_post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        }
    },
    attribute_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'attributes',
            key: 'id'
        }
    },
    value: {
        type: Sequelize.TEXT,
        defaultValue: ''
    }

}, {
    timestamps: false
})
module.exports = attrPostModel