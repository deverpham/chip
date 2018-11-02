const path = require('path');
const glob = require('glob');
const fs = require('fs');

function sample() {
    const content = `
    const assert = require('assert');
    
    `
    return content.trim();
}

function createTestFile() {
    const pathRoot = process.cwd();
    const getFileJSString = path.join(pathRoot, './*.js');
    var files = glob.sync(getFileJSString);
    files = files.filter(file => {
        if (file.indexOf('.test.') != -1) return false;
        return true;
    });
    files.map(file => {
        const name = path.basename(file);
        const nameArray = name.split('\.');
        nameArray.splice(nameArray.length - 1, 0, '.test.');
        const testFilePath = path.join(pathRoot, nameArray.join(''));
        return fs.writeFileSync(testFilePath, sample())
    })
}
module.exports = createTestFile