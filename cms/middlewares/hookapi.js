const {
    Hook
} = require('../providers')
const handlebars = require('handlebars')
module.exports = async function (req, res, next) {

    const hook = new Hook();
    res.locals.hook = hook;
    handlebars.registerHelper('hook', async function (hookname) {
        const done = await this.async();
        const result = await hook.do(hookname)
        done(null, result || '');
    })
    next();
}