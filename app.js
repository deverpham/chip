const CMS = require('./cms');
const config = require('./environments');
const path = require('path');
const app = new CMS(config)

app
    ._prepare()
const route = app.controller().router.create('/home');
route.listen()
app._boot();