const logger = require('../config/winston');

class LogMaker {
    createLog(req, result) {
        switch(result.code / 100) {
            case 2: 
            case 4:
                logger.info(`${req.ip} ${req.method} ${req.baseUrl} ${result.code} ${result?.message}`);
                break;
            case 5: 
                logger.error(`${req.ip} ${req.method} ${req.baseUrl} ${result.code} ${result?.message}`);
                break;
        }
    }
}

module.exports = new LogMaker;