const {
    modify
} = require('./json')
const path = require('path');
console.log(path.join(__dirname, './text.json'))
const data = modify(path.join(__dirname, './text.json'), {
    active: 'true'
})
console.log(data)