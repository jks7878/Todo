const token = require('../common/Token');

exports.verifyToken = (req, next) => {
    try {
        req.decoded = token.verifyToken(req.headers.authorization);
        return next();
    } catch (error) {   
        if(error.name === "TokenExpiredError") {
            error.code = 419;
        }else {
            error.code = 401;
        }

        next(error);
    }
}