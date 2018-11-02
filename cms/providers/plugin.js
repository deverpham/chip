const configAPI = require('./config')
const loggerAPI = require('./logger')
const pathAPI = require('./path');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const filter = require('loopback-filters')
const helperAPI = require('./helper')
class Plugin {
    /**
     * Working with a plugin 
     * @param {string} pathFolder 
     */
    constructor(data) {
        switch (typeof data) {
            case 'string':
                {
                    this.path = data
                }
            case 'object':
                {
                    this.pkgInfo = data
                }
        }
    }

    _active() {
        return helperAPI.json().modify(
            this.pkgInfo.pathDir + '/package.json', {
                active: true
            })
    }
    _disable() {
        const error = helperAPI.json().modify(
            this.pkgInfo.pathDir + '/package.json', {
                active: false
            })
    }
    getInfo() {
        const packageJson = path.join(this.path, './package.json')
        const pkgInfo = helperAPI.json().parseFromFile(packageJson);
        if (pkgInfo != null) {
            pkgInfo['pathDir'] = this.path
        }
        return pkgInfo
    }
    action(type) {
        if (!this.pkgInfo) {
            this.getInfo()
            this.active();
        } else {
            switch (type) {
                case 'active':
                    {
                        return this._active()
                    }
                case 'disable':
                    {
                        return this._disable()
                    }
                case 'toggle':
                    {
                        return this.pkgInfo.active ? this._disable() : this._active()
                    }
            }
        }
    }
}
class PluginAPI {
    getAll() {
        const {
            rootPath
        } = pathAPI.plugin();
        let plugins = glob.sync(rootPath + '/*/')
        plugins = plugins.map(plugin => new Plugin(plugin))
        plugins = plugins.map(plugin => plugin.getInfo())
        return plugins
    }
    async action(name, type) {
        const plugins = await this.getAll();
        const pluginInfo = filter(plugins, {
            where: {
                name
            },
            limit: 1
        })
        if (pluginInfo.length > 0) {
            const plugin = new Plugin(pluginInfo[0]);
            return plugin.action(type)
        }
        return undefined
    }

}
module.exports = new PluginAPI();