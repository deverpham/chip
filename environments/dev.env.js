const path = require('path');
module.exports = {
    mode: 'development',
    name: 'development',
    server: {
        port: 8080,
        siteUrl: "http://localhost:3000"
    },
    database: {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 10000,
            min: 0,
            acquire: 30000,
            idle: 1
        },
        username: "root",
        password: "",
        database: "supercms",
        operatorsAliases: false,
        secret_key: "Let's CBD"
    },
    view: {
        engine: 'handlebars',
        static: {
            path: path.join(__dirname, '../static'),
            route: '/assets'
        }
    },
    plugin: {
        path: path.join(__dirname, '../plugins')
    },
    theme: {
        default: 'default',
        path: path.join(__dirname, '../themes')
    }
}