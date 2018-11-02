const {
    DB,
    Sequelize
} = require('../sequelize')
const PostTypeModel = require('./post_type');
const PostModel = DB.define('post', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    post_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
            model: PostTypeModel,
            key: 'id'
        }
    }
}, {
    timestamps: false
})