const jwt = require('../common/Jwt');
const redis = require('../db/redis');

async function createTokens(userId) {
    const accessToken = await createAccessToken();
    const refreshToken = await createRefreshToken();

    await redis.set(`RefreshToken:${userId}`, refreshToken, {EX: 3600});

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

async function createAccessToken() {
    return jwt.create({iss : "Todo"}, {subject: "access token", expiresIn: "5m"});
}

async function createRefreshToken() {
    return jwt.create({iss : "Todo"}, {subject: "refresh token", expiresIn: "10m"});
}

async function getToken(token) {
    return jwt.verify(token);
}   

async function deleteToken(userId) {
    return redis.del(`RefreshToken:${userId}`);
}

module.exports = {createTokens, createAccessToken, getToken, deleteToken};
