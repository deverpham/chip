const {
    store
} = require('../../api')

const config = require('../../../../environments');
store.config().set(config);
const User = require('../model/user')
const {
    helper
} = require('../../providers')
const hash = helper.encrypt(config.database.secret_key, 'base64', 'thinh123123')
const user = User.build({
    username: 'deverpham',
    password: hash
})
user.save()
    .then(() => {
        console.log('created');
        process.exit();
    })