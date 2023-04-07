const CustomError = require('../common/CustomError');
const jwt = require('../common/Jwt');
const redis = require('../db/redis');
require('dotenv').config();

async function createToken(userId) {
    const token = jwt.createJWT({iss : "Todo"});

    await redis.hset("tokens", `RefreshToken:${userId}`, token.refreshToken);

    return token;
}

async function getToken(userId, token) {
    if(req.headers.authorization) throw new CustomError(400, "Invalid Authorizaion");

    const accessIsExpired = jwt.getJWT(token);
    if(accessIsExpired) {
        const refreshExpired = jwt.getJWT(await redis.hGet('tokens', `RefreshToken:${userId}`));

        if(refreshExpired)  throw new CustomError(401, "JWT is Expired");
    }

    return this.createToken(userId);
}

function authCheck() {

}

// function refreshJWT(req) {
//     if(ref === req.headers.authorization) {
//         const accessToken = token.getAccessToken({
//             iss: "Todo"
//         });

//         const result = {
//             code: 200,
//             accessToken: accessToken
//         }
        
//         return result;
//     }else {
//         throw new CustomError(401, "Unauthorized Token");
//     }
// }

module.exports = {createToken, getToken};
