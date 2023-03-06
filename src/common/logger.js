const winston = require('../config/winston');

class Logger {
    createLog(req, result) {
        const code = parseInt(result.code / 100);
        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

        switch(code) {
            case 2: 
                winston.info(`${ip} ${req.method} ${req.baseUrl} ${result.code} ${result?.message || ''} ${result?.data || ''}`);
                break;
            case 4:
                winston.info(`${ip} ${req.method} ${req.baseUrl} ${result.code} ${result?.message || ''}`);
                break;
            case 5: 
                winston.error(`${ip} ${req.method} ${req.baseUrl} ${result.code} ${result?.message || ''} ${result.trace || ''}`);
                break;
        }
    }
}

module.exports = Logger;
