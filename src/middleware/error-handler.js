const CustomError = require('../common/CustomError');
const Logger = require('../middleware/Logger');

module.exports = (err, req, res, next) => {   
    new Logger().createLog(req, {
        code: err.code,
        message: err.message
    });

    if (err instanceof CustomError) {
        return res.status(err.code).json(err);
    }

    return res.status(500).json(err);
}
