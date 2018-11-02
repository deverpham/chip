class CookieAPI {
    constructor(req) {
        this.req = req
    }
    /**
     * 
     * @param {String} cookieName 
     */
    get(name = undefined) {
        if (!name) return this.req.session
        return this.req.session[name];
    }
    set(name, value) {
        return this.req.session[name] = value;
    }
}
module.exports = CookieAPI;