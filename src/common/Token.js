const CustomError = require('../common/CustomError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getAccessToken(payload) {
    let jwt = createToken(payload, {subject: "access token", expiresIn: "5s"});
    return jwt;
}

function getRefreshToken(payload) {
    let jwt = createToken(payload, {subject: "refresh token", expiresIn: "3d"});
    return jwt;
}

function refresh(token) {

}

function remove(token) {

}

function createToken(payload, options) {
    return jwt.sign(payload, process.env.API_KEY, options);
}

function verifyToken(token) {
    return jwt.verify(token, process.env.API_KEY);
}

module.exports = { getAccessToken, getRefreshToken, refresh, verifyToken }
