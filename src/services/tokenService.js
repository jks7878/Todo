const jwt = require('../common/Jwt');
const redis = require('../db/redis');
require('dotenv').config();

async function createTokens(userId) {
    const accessToken = await createAccessToken();
    const refreshToken = await createRefreshToken();

    await redis.set(`RefreshToken:${userId}`, refreshToken, {EX: 60});

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

async function createAccessToken() {
    return jwt.create({iss : "Todo"}, {subject: "access token", expiresIn: "5s"});
}

async function createRefreshToken() {
    return jwt.create({iss : "Todo"}, {subject: "refresh token", expiresIn: "1m"});
}

async function getToken(token) {
    return jwt.verify(token);
}   

async function deleteToken() {

}

module.exports = {createTokens, createAccessToken, getToken, deleteToken};
