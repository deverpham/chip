const path = require('path');
const configAPI = require('./config')
class PathAPI {
    /**
     * Working With Static Route
     */
    static() {
        const staticPath = configAPI.getStaticPath();
        return (function () {
            return {
                path: staticPath.path,
                /**
                 * Get URL of a static file
                 * @param {string} pathFile 
                 */
                getFileUrl: function (pathFile) {
                    return configAPI.getSiteUrl() + path.join(staticPath.route, pathFile);
                }
            }
        }())
    }
    /**
     * Working With Plugin Folder
     */
    plugin() {
        return (function () {
            return {
                rootPath: configAPI.getPluginFolder()
            }
        }())
    }
}
module.exports = new PathAPI();