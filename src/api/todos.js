const express = require('express');
const router = express.Router();

const { logging } = require('../middleware/logger');
const { authCheck } = require('../middleware/authCheck');

const todoItemService = require('../services/TodoItemService');

router.post('/', logging, authCheck, async (req, res, next) => {    
    try {
        const result = await todoItemService.createTodoItem(req.body);
 
        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:seq', logging, authCheck, async (req, res, next) => {
    try {
        const result = await todoItemService.getTodoItem(req.params.seq);
  
        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/:seq', logging, authCheck, async (req, res, next) => {
    try {
        const todo = req.body;
        todo.ITEM_SQ = req.params.seq;

        const result = await todoItemService.modifyTodoItem(todo);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});


router.delete('/:seq', logging, authCheck, async (req, res, next) => {
    try {      
        const result = await todoItemService.deleteTodoItem(req.params.seq);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
