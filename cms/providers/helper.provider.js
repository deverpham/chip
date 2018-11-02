const crypto = require('crypto');
const jsonHelper = require('./helpers/json')
class Helper {
    /**
     * @param {string} secret_key - the salt
     * @param {string} encode - Encode type example: 'base64', 'hex'
     * @param {string} text - Text that need to be encrypted
     */
    encrypt(secret_key, encode, text) {
        const salt = secret_key
        return crypto.createHmac('sha256', salt)
            .update(text) // Update with content need to be hashed
            .digest(encode);
    }
    json() {
        return {
            ...jsonHelper
        }
    }
}
const helper = new Helper
module.exports = helper