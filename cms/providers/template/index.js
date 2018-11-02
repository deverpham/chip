const arraytoDOM = require('./get_dom_with_array');
class TemplateAPI {
    constructor() {
        this.templates = []
        this['arraytoDOM'] = arraytoDOM;
    }
    /**
     * 
     * @param {string} name name template
     * @param {string} html a string of html
     */
    addTemplate(name, func) {
        this.templates[name] = func
    }
    loadTemplate(name) {
        return this.templates[name]
    }
}
module.exports = new TemplateAPI()