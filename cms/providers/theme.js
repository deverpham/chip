const {
    app
} = require('../../express')
const {
    EventEmitter
} = require('events');
const path = require('path');
class ThemeAPI {
    constructor(name, dir) {
        this.controller = new EventEmitter();
        this.controller.on('change', this.changeTheme)
        this.name = name;
        this.dir = dir;
    }
    /**
     * Set Theme folder for app
     * @param {string} dir Path 
     */
    changeTheme(dir) {
        app.set('views', dir)
    }
    getThemeDir() {
        return app.get('views')
    }
    getAdminTemplateDir() {
        const themeDir = this.getThemeDir();
        return path.join(themeDir, './admin/template');
    }
    getAdminTemplatePath(templatePath) {
        const adminTemplateDir = this.getAdminTemplateDir();
        return path.join(adminTemplateDir, templatePath);
    }
    getThemeHelperDir() {
        return path.join(this.getThemeDir(), './helpers')
    }
    setTheme(dir) {
        this.controller.emit('change', dir)
    }
}
module.exports = new ThemeAPI()