class Template {
    constructor() {
        this.templates = []
    }
    add(name, func) {
        this.templates[name] = func
    }

    load(name) {
        return this.templates[name]
    }
}
const template = new Template();
module.exports = template;