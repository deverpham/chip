const {
    DB,
    Sequelize
} = require('../sequelize')
const {
    store
} = require('../../share')
const {
    helper
} = require('../../providers')
const User = DB.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 6
        },
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 6
        }
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: 'member'
    }
}, {
        timestamps: false
    })
User.prototype.checkCredentials = function (isHash = false) {
    var {
        username,
        password
    } = this.dataValues
    if (!isHash) {
        const hash = helper.encrypt(store.config().get().database.secret_key, password)
        password = hash
    }
    return User.findOne({
        where: {
            username,
            password
        }
    })

}
module.exports = User;