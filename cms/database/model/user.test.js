const UserModel = require('./user');
const assert = require('assert');
it('should return model name', function () {
    return UserModel.name == 'user'
})