const express = require('express');
const router = express.Router();

const { logging } = require('../middleware/logger');
const { authCheck } = require('../middleware/authCheck');

const todoUserService = require('../services/todoUserService');

const DEFAULT_LIMIT = 3;

router.post('/', logging, async (req, res, next) => {
    try {
        const result = await todoUserService.createTodoUser(req.body);

        res.status(result.code).json(result);
    } catch (error) { 
        next(error);
    } 
});

router.get('/:param', logging, authCheck, async (req, res, next) => {
    try {
        const result = await todoUserService.getTodoUser(req.params.param);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:seq/todo-items', logging, authCheck, async (req, res, next) => {
    try {
        const cond = {
            REG_USER_SQ: req.params.seq,
            offset:  req.body.offset || 0,
            limit: DEFAULT_LIMIT
        }
  
        const result = await todoUserService.getTodoItemsFromUserSeq(cond);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/:seq', logging, authCheck, async (req, res, next) => {
    try {
        const userInfo = req.body;
        userInfo.USER_SQ = req.params.seq;

        const result = await todoUserService.modifyTodoUser(userInfo);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:seq', logging, authCheck, async (req, res, next) => {
    try {
        const userSeq = req.params.seq;

        const result = await todoUserService.deleteTodoUser(userSeq);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
