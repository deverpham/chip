class Mdware {
    load() {
        const {
            bodyParserMiddleware,
            hook,
            cookieMiddleware,
            responseMiddleware,
            viewHelperMiddleware
        } = require('../middlewares')
        HANDLER.use( /*eslint-disable-line no-undef */
            hook,
            cookieMiddleware.cookieParser,
            cookieMiddleware.middleware,
            viewHelperMiddleware,
            bodyParserMiddleware.json,
            bodyParserMiddleware.urlencoded,
            responseMiddleware
        )
    }
}
const mdware = new Mdware();
module.exports = mdware;