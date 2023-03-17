const express = require('express');
const router = express.Router();

const tokenService = require('../services/tokenService');

router.post('/', async (req, res) => {
    const result = tokenService.tmp(req);
    res.status(200).json(result);
});

router.post('/test', async (req, res) => {
    res.status(200).json(token.verifyToken(req.headers.authorization));
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
