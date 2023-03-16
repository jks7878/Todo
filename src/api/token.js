const express = require('express');
const router = express.Router();

const token = require('../common/Token');

router.post('/', async (req, res) => {
    res.status(200).json(token.createToken({foo:"bar"}, {expiresIn: "60s"}));
});

router.post('/test', async (req, res) => {
    res.status(200).json(token.verifyToken(req.headers.authorization));
});

module.exports = router;