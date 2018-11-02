const controller = require('../controllers')
const glob = require('glob');
const {
    store
} = require('../share')
const config = store.config();
let engine = null;
switch (config.get().view.engine) {
    case 'ejs':
        {}
    default:
        {}
}

module.exports = engine;
/*

const ejs = require('ejs');
const fs = require('fs');
*/
const path = require('path');
const {
    reactEngine
} = require('../providers')
/*
function ejsRender(req, res, next) {
    const helpers = glob.sync(controller.theme.helper().dir() + '/*.ejs');
    helpers.map(helper => {
        const name = path.basename(helper).replace('.ejs', '');
        const content = fs.readFileSync(helper).toString()
        res.locals[name] = function (data) {
            const dataMapLocals = Object.assign(res.locals, data, {
                ejs
            })
            return ejs.compile(content)(dataMapLocals)
        }
        controller.view.template.add(name, res.locals[name])
    })
    next();
}*/

function react(req, res, next) {
    const helpers = glob.sync(controller.theme.helper().dir() + '/*.jsx');
    helpers.map(async helper => {
        const name = path.basename(helper).replace('.jsx', '');
        res.locals[name] = async function (data) {
            const dataMapLocals = Object.assign(res.locals, data, {})
            const [result, scriptString] = await reactEngine.render(helper, dataMapLocals);
            controller.view.script().add(res, {
                type: 'text',
                content: scriptString
            }, true);
            //console.log(result);
            return result
        }
    })
    next();
}
module.exports = react