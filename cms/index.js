const {
    server,
    hook
} = require('./server');
class CMS {
    /**
     * 
     * @param {siteOpts} config 
     */
    constructor(defaultConfig = {}) {
        this.config = defaultConfig;
        this.svHook = hook;
        this.server = server;
    }
    _prepare() {
        this.svHook.do('BEFORE_BOOT')
        const Share = require('./share');
        Share.store.config().set(this.config);
    }
    boot() {
        this._prepare();
        this._boot();

    }
    _boot() {
        switch (this.config.mode) {
            case 'development':
                {
                    const Logger = require('./providers/logger.provider');
                    const logger = new Logger();

                    function overrideConsoleLog() {
                        global.cpLog = console.log;
                        global.console = logger;
                    }
                    overrideConsoleLog();
                }
            default:
                {
                    function prodLog() {
                        console['sucess'] = console.log;
                    }
                    prodLog();
                    return this.controller().bootApp()
                }
        }
    }

    controller() {
        const controllers = require('./controllers');
        return {
            ...controllers
        }
    }
}
module.exports = CMS