const CMS = require('./cms');
const config = require('./environments');;
const app = new CMS(config)
app.boot();