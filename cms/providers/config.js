const path = require('path');
class ConfigAPI {
    constructor(config) {
        this.configOpts = defaultConfig
    }
    database() {
        return this.configOpts.database;
    }
    /**
     * @description load setting for the app
     * @param {Config} configOpts - the config Object
     */
    load(configOpts) {
        return this.configOpts = configOpts
    }
    getSiteUrl() {
        return this.configOpts.server.siteUrl;
    }
    getStaticPath() {
        return this.configOpts.view.static;
    }
    getPluginFolder() {
        return this.configOpts.plugin.rootFolder
    }
}
module.exports = new ConfigAPI();