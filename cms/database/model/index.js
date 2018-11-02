const UserModel = require('./user');
const PostTypeModel = require('./post_type')
const AttributeModel = require('./attribute')
const PostModel = require('./post')
const attrPostModel = require('./attribute_post')
const AttributePostTypeModel = require('./attribute_post_type');

/*
const AttributePostTypeModel = require('./attribute_post_type');

const attrPostModel = require('./attribute_post')
*/
module.exports = {
    AttributePostTypeModel,
    UserModel,
    AttributeModel,
    PostTypeModel,
    PostModel,
    attrPostModel,
}