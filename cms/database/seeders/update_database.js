const config = require('../../../../environments');
const {
    store
} = require('../../api')
store.config().set(config);
const {
    DB
} = require('../sequelize')
require('../model')
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({
    db: DB
})
const {
    createConnection
} = require('mysql2')
const conn = createConnection({
    user: DB.options.username,
    password: DB.options.password
})

conn
    .promise().query('DROP DATABASE IF EXISTS ' + DB.options.database)
    .then(() => {
        conn.promise().query('CREATE DATABASE IF NOT EXISTS ' + DB.options.database)
            .then(() => {
                console.log('create new database')
                DB
                    .sync({
                        force: true
                    })
                    .then(() => {
                        console.log('synced database')
                        conn.end()
                        process.exit();
                    })
                    .catch(err => {
                        throw err
                    })
            })
            .catch(err => {
                throw err
            })
    })
    .catch(err => {
        throw (err)
    })