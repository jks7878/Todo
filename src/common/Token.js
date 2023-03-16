const jwt = require('jsonwebtoken');
require('dotenv').config();

function getAccessToken(payload) {
    let jwt = createToken(payload, {expiresIn: "60s"});
    return jwt;
}
function getRefreshToken(payload) {
    let jwt = createToken(payload, {expiresIn: "3d"});
    return jwt;
}

function createToken(payload, options) {
    return jwt.sign(payload, process.env.API_KEY, options);
}

function verifyToken(token) {
    return jwt.verify(token, process.env.API_KEY);
}

module.exports = { getAccessToken, getRefreshToken, verifyToken }