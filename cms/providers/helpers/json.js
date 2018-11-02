const fs = require('fs');
const path = require('path');
/**
 * parse a file text to json Object
 * @param {string} filepath 
 * @return {object} if fielpath exist
 * @return {null} if else
 */
function parseFromFile(file_path) {
    if (
        fs.existsSync(file_path) &&
        fs.lstatSync(file_path).isFile()
    ) {

        try {
            return JSON.parse(fs.readFileSync(file_path))
        } catch (err) {
            return null;
        }
    }
    return null;
}

function modify(file_path, data) {
    const pkgInfo = parseFromFile(file_path);
    if (pkgInfo == null) return null;
    const dataWillbeSave = Object.assign(pkgInfo, data);
    return fs.writeFileSync(file_path, JSON.stringify(dataWillbeSave, null, 4), 'utf8');
}

module.exports = {
    parseFromFile,
    modify
}