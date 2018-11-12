const {
    store
} = require('../share')
const engine = store.config().get().view.engine;
const ejs = require('ejs');
const { theme } = require('../controllers');
const path = require('path');
module.exports = function (req, res, next) {

    res.stream = function (filePath, payload = {}) {
        return new Promise(resolve => {
            const themeDir = theme.dir();
            const fileRealPath = filePath
            ejs.renderFile(fileRealPath, {
                ...payload,
                ...res.locals
            }, {
                    async: true
                })
                .then(html => {
                    res.write(html)
                    resolve();
                })
        })
    }
    res.success = function (payload) {
        return res.json({
            status: 'success',
            payload
        })
    }
    res.error = function (error, status = 400) {
        return res.status(status).json({
            status: 'error',
            error: error.toString()
        })
    }
    next();
}