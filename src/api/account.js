const express = require('express');
const router = express.Router();

const AccountService = require('../services/accountService');

router.post('/login', async (req, res, next) => {
    try {
        const result = await AccountService.loginUser(req);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/logout', async (req, res, next) => {
    console.log(req.session);
    try {
        const result = await AccountService.logoutUser(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;