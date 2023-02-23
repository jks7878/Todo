const logger = require('../config/winston');

class LogMaker {
    createLog(req, result) {
        const type = result.code / 100;
        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        
        switch(type) {
            case 2: 
            case 4:
                logger.info(`${ip} ${req.method} ${req.baseUrl} ${result.code} ${result?.message}`);
                break;
            case 5: 
                logger.error(`${ip} ${req.method} ${req.baseUrl} ${result.code} ${result?.message} ${result?.trace}`);
                break;
        }
    }
}

module.exports = new LogMaker;