const express = require('express');
const router = express.Router();

const TodoUserService = require('../services/TodoUserService');

const Logger = require('../common/Logger');

const DEFAULT_LIMIT = 3;

router.post('/', async (req, res, next) => {``
    try {
        const userInfo = req.body;

        const todoUserService = new TodoUserService();

        const result = await todoUserService.createTodoUser(userInfo);

        new Logger().createLog(req, result);   

        res.status(result.code).json(result);
    } catch (error) { 
        next(error);
    } 
});

router.get('/:param', async (req, res, next) => {
    try {
        const param = req.params.param;

        const todoUserService = new TodoUserService();

        const result = await todoUserService.getTodoUser(param);

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
  
        const todoUserService = new TodoUserService();

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

        const todoUserService = new TodoUserService();

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

        const todoUserService = new TodoUserService();

        const result = await todoUserService.deleteTodoUser(userSeq);

        new Logger().createLog(req, result);   

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
