/* eslint no-undef:1 */
const path = require('path');
const fs = require('fs');
const {
    helper
} = require('../providers')
const {
    EventEmitter
} = require('events');
const {
    store
} = require('../share')
class Theme {
    constructor() {
        this.controller = new EventEmitter();
        this.controller.on('change', this.changeTheme);
    }
    _run() {
        const pkgInfo = helper.json().parseFromFile(this.dir() + '/package.json');
        if (pkgInfo == null) {
            console.error('theme:missing package.json:', this.dir())
        } else {
            const funcF = path.join(this.dir(), pkgInfo.main);
            if (fs.existsSync(funcF)) {
                require(funcF)
            } else {
                console.error('theme:missing func file:', this.dir())
            }
        }
    }
    setTheme(dir) {
        console.info('theme: ', dir)
        this.controller.emit('change', dir)
    }
    changeTheme(dir) {
        HANDLER.set('views', dir)
    }
    dir() {
        return HANDLER.get('views')
    }
    admin() {
        return {
            templateDir: () => {
                const dir = this.dir();
                return path.join(dir, './admin/template');
            },
            templatePath: (file) => {
                const dir = this.admin().templateDir();
                return path.join(dir, file);
            }
        }
    }
    helper() {
        return {
            dir: () => {
                return path.join(this.dir(), './templates')
            }
        }
    }
    load() {
        const {
            theme
        } = store.config().get();
        this.setTheme(theme.path + '/' + theme.default);
        this._run();
    }
}
const theme = new Theme();
module.exports = theme;