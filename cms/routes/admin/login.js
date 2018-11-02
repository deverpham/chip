const {
    Router,
    Model
} = require('../../providers')
const [route] = [new Router.Route(HANDLER)]
const render = require('../render/admin.render')
const {
    theme,
    view
} = require('../../controllers')
route.get('/', function (req, res, next) {
    next();
})
module.exports = route