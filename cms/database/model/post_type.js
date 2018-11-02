const {
    DB,
    Sequelize
} = require('../sequelize')

const PostType = DB.define('post_type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})
PostType.prototype.getBySlug = async function () {
    const {
        slug
    } = this.dataValues;
    return await PostType.findOne({
        slug
    })
}
module.exports = PostType