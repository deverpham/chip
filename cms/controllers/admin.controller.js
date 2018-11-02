const {
    viewAPI
} = require('../../api')
class AdminController {
    /**
     * Default Asset Middleware
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    autoAssets(req, res, next) {
        viewAPI.addCss(res, {
            type: 'link',
            content: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        })
        viewAPI.addScript(res, {
            type: 'link',
            content: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
        })
        viewAPI.addScript(res, {
            type: 'link',
            content: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        })
        next();
    }
}
module.exports = new AdminController();