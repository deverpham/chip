const {
    Hook
} = require('../providers')
const handlebars = require('handlebars')
module.exports = async function (req, res, next) {

    const hook = new Hook();
    res.locals.hook = hook;
    next();
}