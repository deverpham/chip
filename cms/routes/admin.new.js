const {
    Router,
    Model
} = require('../providers')
const {
    theme,
    view
} = require('../controllers')
const route = new Router.Route(HANDLER, '/admin'); /*eslint-disable-line no-undef */
const lgRoute = require('./admin/login');
route.use('/login', lgRoute)
//route.listen()