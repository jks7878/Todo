const CustomError = require('../common/CustomError');
const tokenService = require('../services/tokenService');
const jwt = require('../common/Jwt');
const redis = require('../db/redis');

module.exports = {
    authCheck: async function (req, res, next) {
        try {
            if(req.headers.authorization) {
                const accessToken = await jwt.verify(req.headers.authorization);
                if(!accessToken) {
                    const refreshToken = await jwt.verify(await redis.get(`RefreshToken:${req.params.id}`));
                    if(!refreshToken) throw new CustomError(401, "JWT is Expired");
                }
                const t = await tokenService.createAccessToken();
                console.log(t);
                req.headers.authorization = t;
                
                next();
            }else {
                throw new CustomError(401, "Auth Error");
            }
        } catch (error) {
            next(error);
        }
    }
};
