const {
    DB,
    Sequelize
} = require('../sequelize')
const AttrModel = require('./attribute');
const AttributePostTypeModel = DB.define('attribute_post_type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    post_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
            model: 'post_types',
            key: 'id'
        }
    },
    attribute_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
            model: AttrModel,
            key: 'id',
        }
    }
}, {
    timestamps: false
})
module.exports = AttributePostTypeModel;