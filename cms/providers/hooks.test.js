const HookFilter = require('./hooks');
const hook = new HookFilter();
hook.add_action('TEST', {
    callback: function (person) {
        person.age = 20
        return person
    }
})
hook.add_action('TEST', {
    callback: function (value) {
        return value;
    }
})
hook.do_action('TEST', {
    name: 'thinh'
}).then(result => {
    console.log(JSON.stringify(result))
})