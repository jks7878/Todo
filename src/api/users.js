const express = require('express');
const router = express.Router();

const todoUserService = require('../services/todoUserService');

const Logger = require('../middleware/Logger');

const DEFAULT_LIMIT = 3;

router.post('/', async (req, res, next) => {
    try {
        const result = await todoUserService.createTodoUser(req.body);

        new Logger().createLog(req, result);   

        res.status(result.code).json(result);
    } catch (error) { 
        next(error);
    } 
});

router.get('/:param', async (req, res, next) => {
    try {
        const result = await todoUserService.getTodoUser(req.params.param);

        new Logger().createLog(req, result);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:seq/todo-items', async (req, res, next) => {
    try {
        const cond = {
            REG_USER_SQ: req.params.seq,
            offset:  req.body.offset || 0,
            limit: DEFAULT_LIMIT
        }
  
        const result = await todoUserService.getTodoItemsFromUserSeq(cond);

        new Logger().createLog(req, result);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/:seq', async (req, res, next) => {
    try {
        const userInfo = req.body;
        userInfo.USER_SQ = req.params.seq;

        const result = await todoUserService.modifyTodoUser(userInfo);

        new Logger().createLog(req, result);   

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:seq', async (req, res, next) => {
    try {
        const userSeq = req.params.seq;

        const result = await todoUserService.deleteTodoUser(userSeq);

        new Logger().createLog(req, result);   

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
