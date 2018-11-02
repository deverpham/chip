const handlebars = require('handlebars-async')(require('handlebars'))
const fs = require('fs');
const path = require('path');
class Handlebars {
    render(file, opts = {}) {
        return new Promise((resolve, reject) => {
            const patt = new RegExp(/[aA-zZ]\.[aA-zZ]/g)
            const isFile = patt.test(file);
            var template = null;
            if (!isFile) {
                template = handlebars.compile(file);
                template(opts, function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            } else {
                template = handlebars.compile(fs.readFileSync(file, 'utf-8'));
                template(opts, function (err, result) {
                    if (err) reject(err)
                    else resolve(result);
                })
            }
        })
    }
}
const handle = new Handlebars();
//handle.render(path.join(__dirname, './test.hbs'))

module.exports = handle