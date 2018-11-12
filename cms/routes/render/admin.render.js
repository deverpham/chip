const {
    Router
} = require('../../providers')
const {
    theme,
    view
} = require('../../controllers')
const admin = new Router.Render();
admin.Header = async function (req, res) {

    view.style().add(res, {
        type: 'link',
        content: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    })
    view.script().add(res, {
        type: 'link',
        content: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
    })
    view.script().add(res, {
        type: 'link',
        content: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    })
    view.script().add(res, {
        type: 'link',
        content: "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.5/angular.min.js"
    })
    await res.stream(view.file('templates/header.ejs'));
}
admin.Footer = async function (req, res) {
    await res.stream(view.file('templates/footer.ejs'))
}
module.exports = admin