const {
    store
} = require('../share')
const express = require('express');
class Resources {
    load() {
        const {
            path,
            route
        } = store.config().get().view.static;
        HANDLER.use(route, express.static(path)); /* eslint-disable-line no-undef */
        console.info('resource->load:path', path);
    }
}
const resources = new Resources();
module.exports = resources;