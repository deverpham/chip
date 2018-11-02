const {
    Hook
} = require('../providers')
module.exports = async function (req, res, next) {
    const hook = new Hook;
    res.locals.hook = hook;
    next();
}