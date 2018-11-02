const express = require('express');
const server = express();
const Hook = require('./providers/hook.provider');
const hook = new Hook();
module.exports = {
    server,
    hook
}