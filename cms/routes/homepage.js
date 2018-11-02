const {
    RouterAPI,
    RouterChild,
    ModelAPI,
    themeAPI,
    CookieAPI,
    viewAPI,
    pathAPI,
    loggerAPI,
    helperAPI,
    GuardAPI
} = require('../../api')
const adminController = require('../controllers/admin.controller');
const {
    homeRoute,
    pluginRoute
} = require('./admin/')

const route = new RouterAPI('person/');
route.get('/', (req, res) => {
    res.end()
})
const child = new RouterChild('thinh');
child.configValidate({
    "/thinh": {
        "GET": {
            header: {
                'Xtoken': child.joi.required()
            }
        }
    }
})
child.get('/thinh', (req, res) => {
    res.send('thinh')
})
child.get('/', (Req, res) => {
    res.send('gg')
})
route.use('/thinh', child.listen())
route.listen()