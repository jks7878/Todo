const express = require('express');
const router = express.Router();

const { authCheck } = require('../middleware/authCheck');

const tokenService = require('../services/tokenService');

router.post('/', async (req, res, next) => {
    try {
        const result = tokenService.createToken(req);
        res.status(200).json(result);   
    } catch (error) {
        next(error);
    }
});

router.post('/test', authCheck, async (req, res, next) => {
    try {
        const result = await tokenService.getToken(req.headers.authorization);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }

});

module.exports = router;
