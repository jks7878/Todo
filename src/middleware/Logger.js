const winston = require('../config/winston');

module.exports = {
    logging: function (req, res, next) {
        try {         
            switch(req.method) {
                case 'GET':
                    break;
                case 'POST':
                    break;
                case 'PATCH':
                    break;
                case 'DELETE':
                    break;
            }

            winston.info(`${req.headers['x-real-ip'] || req.connection.remoteAddress} ${req.method} ${req.baseUrl} ${JSON.stringify(req.body)}`);
            next();
        } catch (error) {
            winston.error(`${req.headers['x-real-ip'] || req.connection.remoteAddress} ${req.method} ${req.baseUrl} ${JSON.stringify(req.body)} ${error}`);
            next(error);
        }
    }
};
