const Sequelize = require('sequelize');
const {
    store
} = require('../share');
const config = store.config().get();
const DB = new Sequelize(config.database);
module.exports = {
    DB,
    Sequelize
};