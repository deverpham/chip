const controller = require('../controllers')
const glob = require('glob');
const bar = require('handlebars');
const path = require('path');
const fs = require('fs');
const {
    store
} = require('../share')
const config = store.config();
let func = null;
switch (config.get().view.engine) {
    default:
        {
            const hbs = require('handlebars');
            func = function (req, res, next) {
                const helpers = glob.sync(path.join(__dirname, '../views/partials') + '/*.hbs');
                helpers.map(helper => {
                    const name = path.basename(helper).replace('.hbs', '');
                    const content = fs.readFileSync(helper, 'utf-8');
                    hbs.registerHelper(name, async function (args) {
                        await this.async();
                        const opts = args.hash;
                        return content;
                    })
                })
                next();
            }
        }
}
module.exports = func;
/*

const ejs = require('ejs');
const fs = require('fs');

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

/*
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
*/