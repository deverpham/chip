const {
    Router,
    Model
} = require('../../providers')
const {
    server,
    hook
} = require('../../server')
const [route] = [new Router.Route(server, hook)]
const render = require('../render/admin.render')
const {
    theme,
    view
} = require('../../controllers')
route.get('/', render.set(function (req, res) {
    res.write('how are you');
}))
module.exports = route