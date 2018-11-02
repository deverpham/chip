const path = require('path');
const glob = require('glob');
const fs = require('fs');
const {
    parseFromFile
} = require('../api/helpers/json')
const {
    loggerAPI
} = require('../api')

module.exports = (function () {
    const pluginFolder = path.join(__dirname, '../../plugins/*/');
    return {
        load: function (req, res, next) {
            var plugins = glob.sync(pluginFolder)
            const listPluginWillRun = []
            const cachewillbeRemove = []
            plugins.filter(async plugin => {
                let packagePath = path.join(plugin, './package.json');
                const pkgInfo = parseFromFile(packagePath);
                if (pkgInfo == null)
                    loggerAPI.warn(
                        'PLUGIN',
                        loggerAPI.color('red', path.basename(plugin).toUpperCase()),
                        'missing package.json')
                if (pkgInfo == null || !pkgInfo.active) return;
                let indexFilePath = path.join(plugin, pkgInfo.main);
                if (!fs.existsSync(indexFilePath)) {
                    loggerAPI.warn(
                        'PLUGIN',
                        loggerAPI.color('red', path.basename(plugin).toUpperCase()),
                        'missing index file')
                } else {
                    let pluginModule = require(indexFilePath);
                    if ('init' in pluginModule) {
                        let mask = pluginModule.init
                        pluginModule.init = async function (req, res) {
                            return await mask.apply(mask, arguments);
                        }
                        listPluginWillRun.push(pluginModule)
                        cachewillbeRemove.push(indexFilePath);
                        cachewillbeRemove.map(link => {
                            delete require.cache[require.resolve(link)]
                        })
                    } else {
                        loggerAPI.error('plugin: ' + path.basename(plugin).toUpperCase() + `: missing init function`)
                    }
                }
            })
            Promise.all(listPluginWillRun.map(plugin => {
                return plugin.init(req, res)
            })).then(() => {
                next()
            })
        }
    }
}())