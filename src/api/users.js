const express = require('express');
const router = express.Router();

const { logging } = require('../middleware/logger');
const { authCheck } = require('../middleware/authCheck');
const { checkUserInfo, checkUserExist } = require('../middleware/userCheck');

const todoUserService = require('../services/todoUserService');

router.post('/', logging, checkUserInfo, async (req, res, next) => {
    try {
        const result = await todoUserService.createTodoUser(req.body);

        res.status(result.code).json(result);
    } catch (error) { 
        next(error);
    } 
});

router.get('/:param', logging, checkUserExist, async (req, res, next) => {
    try {
        const result = await todoUserService.getTodoUser(req.cond);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/:seq', logging, authCheck, checkUserExist, async (req, res, next) => {
    try {
        const userInfo = req.body;
        userInfo.USER_SQ = req.params.seq;

        const result = await todoUserService.modifyTodoUser(userInfo);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:seq', logging, authCheck, checkUserExist, async (req, res, next) => {
    try {
        const userSeq = req.params.seq;

        const result = await todoUserService.deleteTodoUser(userSeq);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
