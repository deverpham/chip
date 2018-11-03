var Handlebars = require('handlebars');
var handlebarsAsync = require('./node_modules/handlebars-async/lib/handlebars');
var hbs = handlebarsAsync(Handlebars)
hbs.registerPartial('ss', 'Hello Iams a partial');

var tpl = hbs.compile('{{>ss}}');
tpl(function (err, content) {
    console.log(content)
})