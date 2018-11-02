const assert = require('assert');
const fieldsToDOM = require('./get_dom_with_array')
const result = fieldsToDOM(
    [{
            name: 'title',
            type: 'text'
        },
        {
            name: 'price',
            type: 'number'
        }
    ]);
it('should return input', function () {
    return result.indexOf('input') != -1;
})