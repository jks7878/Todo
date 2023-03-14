const jwt = require('jsonwebtoken');

const secretKey = process.env.API_KEY;

function createToken(payload) {
    return jwt.sign(payload, secretKey, {});
}

function decodeToken(token) {
    return jwt.verify(token, secretKey);
}

module.exports = {createToken, decodeToken};