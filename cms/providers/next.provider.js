const next = require('next');
class Next {
    constructor() {
        this.app = next({
            dev: process.env.NODE_ENV == 'prod' ? false : true
        })
    }
    async prepare() {
        await this.app.prepare();
    }
    fusion(app) {
        app.use((req, res) => this.app.handleRequest(req, res))
    }
}
module.exports = Next;