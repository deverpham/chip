const cl_store = require("./cl_store");
const theme = require("../theme.controller");
const middleware = require("../middleware.controller");
const plugin = require("../plugin.controller");
const resource = require("../resources.controller");
const view = require("../view.controller");
const routes = require("../routes.controller");
const isDev = require('./is_dev');
const {
    server,
    hook
} = require('../../server')
const {
    Monitor
} = require('../../providers')
const {
    store
} = require("../../share");
const {
    WebHandler
} = require("../../providers");
async function bootApp() {
    if (isDev()) {
        const pCheck = new Monitor(false);
        global.pCheck = pCheck
        pCheck.start();
    }
    console.info("booting your app...");
    cl_store();
    console.info("loading database");
    await loadDB();
    console.info("db:completed");
    createHandler();
    console.info("hanlder:registered");
    middleware.load();
    resource.load();
    plugin.load();
    view.load();
    theme.load();
    await hook.do('BEFORE_LOAD_ROUTER');
    routes.load();
    await hook.do('AFTER_LOAD_ROUTER')
    //next.fusion(HANDLER.ctrl);
    errorHanding();
    await HANDLER.listen(); // eslint-disable-line no-undef
    if (isDev()) {
        var result = await pCheck.analytic()
        console.log(result);
    }
    await hook.do('AFTER_BOOT')
}

function loadDB() {
    require("../../database/model");
}

function errorHanding() {
    HANDLER.use(function (req, res, next) { // eslint-disable-line no-undef
        throw (new Error('sorry! i didnt found your request'))
    })
    HANDLER.use(function (err, req, res, next) { // eslint-disable-line no-undef
        res.error(err);
    });
}
async function createHandler() {
    const configServer = store.config().get().server;
    server.listen(configServer.port);
    store.storage().set("HANDLER", server); /* add handler to global object */
}
module.exports = bootApp;