const {
    RouterAPI
} = require('../../api')

const productsRoute = new RouterAPI();

const validate = require('express-validation');


productsRoute.configValidate({
    '/': {
        'POST': {
            headers: {
                xtokend: productsRoute.joi.string().required()
            }
        }
    }
})
productsRoute.get('/', (req, res) => {
    res.send('Products')
})
const penRoute = new RouterAPI();
penRoute.get('/', (req, res) => {
    res.send('pens product')
})
productsRoute.use('/pen', penRoute)

productsRoute.listen()