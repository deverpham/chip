const {
    hook,
    server
} = require('../server')
const {
    Router
} = require('../providers')
class Routes {
    load() {
        require('../routes');
    }
    create(routePath) {
        return new Router.Route(server, hook, routePath);
    }
    /*
        add(route, handle, method = 'GET') {
            const route = new Router.Route(server, route);
            route[method.toLocaleLowerCase()]
            hook.add('BEFORE_ROUTER_LOADING', function () {
                server[method.toLowerCase()](route, handle);
            })
        }*/
}
const routes = new Routes
module.exports = routes