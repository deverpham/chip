const express = require('express');
class Handler {
    constructor(opts) {
        this.opts = opts;

    }

}
class WebHandler extends Handler {
    constructor(opts) {
        super(opts)
        this.ctrl = express();
    }
    listen() {
        return new Promise(resolve => {
            this.ctrl.listen(this.opts.port, () => {
                console.info('port:', this.opts.port)
                resolve();
            })
        })
    }
}
module.exports = {
    WebHandler
}