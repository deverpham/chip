const RouterExpress = require('express').Router
const validate = require('express-validation');
const joi = require('joi')
class Route {
    constructor(handler, hook, slash = "", opts = {
        before_load_router: 'BEFORE_LOAD_ROUTER',
        after_load_router: 'AFTER_LOAD_ROUTER'
    }) {
        this._slash = slash;
        this.handler = handler;
        this._validates = {};
        this.opts = opts;
        this.hook = hook
        this.native = new RouterExpress();
        const extendNative = Object.assign(this.native, {
            listen: this.listen.bind(this),
            joi: joi,
            initValidate: this.initValidate.bind(this),
            configValidate: this.configValidate.bind(this),
            enableGuard: this.enableGuard.bind(this),
            virtual: this.virtual.bind(this),
            render: this.render.bind(this)
        });
        return extendNative
    }
    render(req, res) {
        res.end()
    }
    listen() {
        if (this.hook == null) {
            console.info(`listen Route: `, this._slash);
            return this.handler.use(this._slash, this.native)
        }
        this.hook.add(this.opts.after_load_router, () => {
            console.info(`listen Route: `, this._slash);
            this.handler.use(this._slash, this.native)
        })
    }
    initValidate() {
        const Routes = Object.keys(this._validates);
        Routes.map(route => {
            const methods = Object.keys(this._validates[route]);
            methods.map(method => {
                this.native[method.toLowerCase()](route.toLowerCase(), validate(this._validates[route][method]))
            })
        })

    }
    configValidate(validates) {
        this._validates = validates;
        this.initValidate();
    }

    enableGuard(...guards) {
        guards.map(guard => {
            this.native.use(guard.listen())
        })
    }
    virtual() {
        this.name = ' thinh'
        return {
            set: (template) => {

            },
            create: (callback, payload) => {
                const [req, res] = payload;
                console.log(callback);
                return callback;
            }
        }
    }
}
class Render {
    constructor() {
        this.lifeCycle = async function (req, res, ) {

            await this.Before(req, res);
            await this.Header(req, res);
            await this.Content(req, res);
            await this.Footer(req, res);
            await this.After(req, res);
            res.end();
        }
        this.hooks = {
            before: [],
            after: []
        }
        this.Before = async (req, res) => {
            await Promise.all(this.hooks.before.map(f => f(req, res)))
        };
        this.After = async (req, res) => {
            await Promise.all(this.hooks.after.map(f => f(req, res)))
        }
        this.Header = () => {};
        this.Footer = () => {};
    }
    apply(receiver, n, args) {
        this.Content = receiver
        return this.lifeCycle(...args);
    }
    set(receiver) {
        return new Proxy(receiver, this);
    }
    before(before) {
        this.hooks.before.push(before)
        return this;
    }
    after(after) {
        this.hooks.after.push(after)
        return this;
    }
    clone() {
        const newRender = new Render();
        newRender.Header = this.Header;
        newRender.Footer = this.Footer;
        newRender.hooks = {
            before: [],
            after: []
        }
        return newRender;
    }
}
module.exports = {
    Route,
    Render
};