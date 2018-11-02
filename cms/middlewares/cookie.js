/* eslint no-undef:0 */
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const {
    store
} = require('../share')
const sessionStore = new SequelizeStore({
    db: DB
})

module.exports = function () {
    const middleware = session({
        secret: store.config().get().database.secret_key,
        store: sessionStore,
        cookie: {
            maxAge: 600000000000
        },
        resave: false,
        saveUninitialized: true,
        proxy: false
    })
    sessionStore.sync()
    return {
        cookieParser: cookieParser(),
        middleware
    }
}