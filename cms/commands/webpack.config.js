const path = require('path');
module.exports = {
    entry: './test.command.js',
    output: {
        path: path.join(__dirname),
        filename: './exec.js'
    },
    target: 'node'
}