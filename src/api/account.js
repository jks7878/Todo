const express = require('express');
const router = express.Router();

const { logging } = require('../middleware/logger');
const { checkUserExist } = require('../middleware/userCheck');

const accountService = require('../services/accountService');

router.post('/login', logging, async (req, res, next) => {
    try {
        const result = await accountService.loginUser(req.body.USER_ID, req.body.USER_PW);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/logout', logging, checkUserExist, async (req, res, next) => {
    try {
        const result = await accountService.logoutUser(req.body.USER_ID);
        
        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
