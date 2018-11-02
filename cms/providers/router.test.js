const {
    Router
} = require('./router');
const express = require('express');
const routerEx = new express.Router();
const router = new Router();
console.log(router)

router.use('/', function (req, res) {
    console.log('yeah')
})

console.log(router)