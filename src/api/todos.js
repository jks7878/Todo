const express = require('express');
const router = express.Router();

const { logging } = require('../middleware/logger');
const { authCheck } = require('../middleware/authCheck');
const { checkUserExist } = require('../middleware/userCheck');
const { checkItemExist } = require('../middleware/itemCheck');

const todoItemService = require('../services/TodoItemService');

router.post('/', logging, authCheck, checkUserExist, async (req, res, next) => {    
    try {
        req.body.REG_USER_SQ = req.cond.USER_SQ;
        const result = await todoItemService.createTodoItem(req.body);
 
        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:seq', logging, authCheck, checkItemExist, async (req, res, next) => {
    try {
        const result = await todoItemService.getTodoItem(req.cond);
  
        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:seq/todo-items', logging, authCheck, checkUserExist, checkItemExist, async (req, res, next) => {
    try {
        const cond = {
            REG_USER_SQ: req.params.seq,
            offset:  req.body.offset || 0,
            limit: 5
        }
  
        const result = await todoItemService.getTodoItemsFromUserSeq(cond);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/:seq', logging, authCheck, checkItemExist, async (req, res, next) => {
    try {
        const todo = req.body;
        todo.ITEM_SQ = req.params.seq;

        const result = await todoItemService.modifyTodoItem(todo);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});


router.delete('/:seq', logging, authCheck, checkItemExist, async (req, res, next) => {
    try {      
        const result = await todoItemService.deleteTodoItem(req.params.seq);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
