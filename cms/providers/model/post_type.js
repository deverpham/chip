const {
    PostTypeModel
} = require('../../core/database/index')

function getbySlug(slug) {
    return PostTypeModel.findOne({
        slug
    })
}
module.exports = {
    getbySlug
}