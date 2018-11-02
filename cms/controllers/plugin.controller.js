const {
    store
} = require('../share');
const {
    parseFromFile
} = require('../providers').helper.json()
const [glob, fs, path] = [require('glob'), require('fs'), require('path')]
class Plugin {
    load() {
        return HANDLER.use(this.get) /* eslint-disable-line no-undef */
    }
    get(req, res, next) {
        const pluginFolder = store.config().get().plugin.path + '/*/';
        var plugins = glob.sync(pluginFolder)
        const listPluginWillRun = []
        const cachewillbeRemove = []
        plugins.filter(async plugin => {
            let packagePath = path.join(plugin, './package.json');
            const pkgInfo = parseFromFile(packagePath);
            if (pkgInfo == null)
                console.warn(
                    'PLUGIN',
                    console.color('red', path.basename(plugin).toUpperCase()),
                    'missing package.json')
            if (pkgInfo == null || !pkgInfo.active) return;
            let indexFilePath = path.join(plugin, pkgInfo.main);
            if (!fs.existsSync(indexFilePath)) {
                console.warn(
                    'PLUGIN',
                    console.color('red', path.basename(plugin).toUpperCase()),
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
                    console.error('plugin: ' + path.basename(plugin).toUpperCase() + `: missing init function`)
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
const plugin = new Plugin();
module.exports = plugin