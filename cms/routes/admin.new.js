const {
    Router,
    Model
} = require('../providers')
const {
    theme,
    view
} = require('../controllers')

const {
    server,
    hook
} = require('../server')
const route = new Router.Route(server, hook, '/admin'); /*eslint-disable-line no-undef */
const lgRoute = require('./admin/login');
route.use('/login', lgRoute)
route.listen()