const express = require('express');
const router = express.Router();

const { authCheck } = require('../middleware/authCheck');

const AccountService = require('../services/accountService');

router.post('/login', async (req, res, next) => {
    try {
        const result = await AccountService.loginUser(req.body.USER_ID, req.body.USER_PW);
        
        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/logout', authCheck, async (req, res, next) => {
    try {
        const result = await AccountService.logoutUser(req.body.userId);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;