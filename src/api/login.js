const express = require('express');
const router = express.Router();

const LoginService = require('../services/LoginService');

router.post('/', async (req, res, next) => {
    try {
        const result = await LoginService.authenticateUser(req.body.USER_ID, req.body.USER_PW);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;