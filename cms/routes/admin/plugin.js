const {
    RouterAPI,
    pluginAPI
} = require('../../../api')
const pluginRoute = new RouterAPI()
const joi = require('joi')
pluginRoute.configValidate({
    '/:plugin*': {
        'GET': {
            query: {
                action: joi.string().required()
            }
        }
    }
})
pluginRoute.get('/', async function (req, res) {

    const plugins = await pluginAPI.getAll();
    res.setHeader('Content-Type', 'text/html')
    await res.renderStream('admin/plugin.ejs', {
        plugins
    })
    res.end()
})
pluginRoute.get('/:plugin', async function (req, res) {
    const name = req.params.plugin;
    const action = req.query.action;
    switch (action) {
        case 'toggle':
            {
                pluginAPI.action(name, 'toggle')
                res.success('done')
                return;
            }
        case 'active':
            {
                pluginAPI.action(name, 'active')
                res.success('done')
                return;
            }
        case 'disable':
            {
                pluginAPI.action(name, 'disable')
                res.success('done')
                return;
            }
        default:
            {
                res.send(name)
            }
    }
})
module.exports = pluginRoute