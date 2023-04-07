const express = require('express');
const router = express.Router();

const tokenService = require('../services/tokenService');
const Logger = require('../common/Logger');

router.post('/', async (req, res, next) => {
    try {
        const result = tokenService.createToken(req);
        res.status(200).json(result);   
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const result = tokenService.getToken(userId, req.headers.authorization);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }

});

router.post('/refresh', async (req, res, next) => {
    try {
        const result = tokenService.refreshJWT(req);
        
        res.status(result.code).json(result);  
    } catch (error) {
        next(error);
    }
});

module.exports = router;
