const CustomError = require('../common/CustomError');
const token = require('../common/Token');

let ref = "";
function createJWT(req) {
    const payload = {
        iss: "Todo"
    };
    const accessToken = token.getAccessToken(payload);
    const refreshToken = token.getRefreshToken(payload);

    ref = refreshToken;

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

function refreshJWT(req) {
    if(ref === req.headers.authorization) {
        const accessToken = token.getAccessToken({
            iss: "Todo"
        });

        const result = {
            code: 200,
            accessToken: accessToken
        }
        
        return result;
    }else {
        throw new CustomError(401, "Unauthorized Token");
    }
}

module.exports = {createJWT, refreshJWT};
