const express = require('express');
const router = express.Router();

const TodoItemService = require('../services/TodoItemService');

const Logger = require('../common/Logger');

router.post('/', async (req, res, next) => {    
    try {
        const todo = req.body;

        const todoItemService = new TodoItemService();

        const result = await todoItemService.createTodoItem(todo);

        new Logger().createLog(req, result);   

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:seq', async (req, res, next) => {
    try {
        const itemSeq = req.params.seq;

        const todoItemService = new TodoItemService();

        const result = await todoItemService.getTodoItem(itemSeq);

        new Logger().createLog(req, result);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/:seq', async (req, res, next) => {
    try {
        const todo = req.body;
        todo.ITEM_SQ = req.params.seq;

        const todoItemService = new TodoItemService();

        const result = await todoItemService.modifyTodoItem(todo);

        new Logger().createLog(req, result);   

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});


router.delete('/:seq', async (req, res, next) => {
    try {      
        const itemSeq = req.params.seq;

        const todoItemService = new TodoItemService();

        const result = await todoItemService.deleteTodoItem(itemSeq);

        new Logger().createLog(req, result);   

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
