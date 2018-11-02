const {
    store
} = require('../../share')

function isDev() {
    const config = store.config().get();
    return config.mode == 'development'
}
module.exports = isDev