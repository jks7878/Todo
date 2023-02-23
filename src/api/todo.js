const express = require('express');
const router = express.Router();

const DB = require('../db/db');
const queryMaker = require('../common/queryMaker');
const logMaker = require('../common/logMaker');
const logger = require('../config/winston');

router.post('/', async (req, res) => {    
    const todo = req.body;

    let result = {};
    
    try {
        result = await createTodoItem(todo);
    } catch (error) {
        // logger.error(`${req.ip} ${req.method} ${req.baseUrl} ${message}`);
        result.code = 500;
        result.message = error;
    } finally {
        logMaker.createLog(req, result);   
        res.status(result.code).json(result);
    }
});

async function createTodoItem(todo) {
    let result = {}; 

    if(Object.keys(result).length == 0) result = await verificareRegUserSeq(todo.REG_USER_SQ);
    if(Object.keys(result).length == 0) result = await insertIntoTodoItem(todo);

    return result;
}

async function verificareRegUserSeq(seq) {
    let result = {};

    const [user] = await DB.executeQuery(`SELECT USER_SQ FROM TODO_USER WHERE USER_SQ = ${seq}`);
    
    if(!user || user.length == 0) {
        result = {
            code: 400,
            message: "Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails"
        };
    }

    return result;
}

async function insertIntoTodoItem(todo) {
    const setClause = queryMaker.createSetClause(todo);

    const [res] = await DB.executeQuery(`INSERT INTO TODO_ITEM SET ${setClause.join(',')}`);
    
    const result = {
        code: 201,
        message: "TodoItem Created",
        data: res
    };
    
    return result;
}
router.get('/:seq', async (req, res) => {
    const seq = req.params.seq;

    let todoList = [];

    try {
        const query = `SELECT * FROM TODO_ITEM WHERE ITEM_SQ = '${seq}'`;  
        logMaker.createLog(req,"error",error);

        [todoList] = await DB.executeQuery(query);    
    } catch (error) {
        logMaker.createLog(req,"error",error);
    } finally {
        res.json(todoList);
    }
});

router.patch('/:seq', async (req, res) => {
    const updateInfo = req.body;
    updateInfo.ITEM_SQ = req.params.seq;

    let result = {};

    try {
        result = await modifyTodoItem(updateInfo);
    } catch (error) {
        result.code = 500;
        result.message = error;
    } finally {
        logMaker.createLog(req, result);   
        res.status(result.code).json(result);
    }    
});

async function modifyTodoItem(updateInfo) {
    let result = {};
  
    if(Object.keys(result).length == 0) result = await verificareRegUserSeq(updateInfo.REG_USER_SQ);
    if(Object.keys(result).length == 0) result = await verificareTodoItemSeq(updateInfo.ITEM_SQ);
    if(Object.keys(result).length == 0) result = await updateTodoItem(updateInfo);

    return result;
}
async function verificareTodoItemSeq(seq) {
    let result = {};

    const [todo] = await DB.executeQuery(`SELECT ITEM_SQ FROM TODO_ITEM WHERE ITEM_SQ = ${seq}`);
    
    if(!todo || todo.length == 0) {
        result = {
            code: 400,
            message: "Cannot find ITEM_SQ from TODO_ITEM"
        };
    }
    
    return result;
}
async function updateTodoItem(updateInfo) {
    let setClause = queryMaker.createSetClause(updateInfo);

    const [res] = await DB.executeQuery(`UPDATE TODO_ITEM SET ${setClause.join(',')} WHERE ITEM_SQ = ${updateInfo.ITEM_SQ}`);    

    const result = {
        code: 201,
        message: "TodoItem Updated",
        data: res
    };

    return result;
}

router.delete('/:seq', async (req, res) => {
    const seq = req.params.seq;
    
    let result = {};

    try {      
        result = await deleteTodoItem(seq);
    } catch (error) {
        result.code = 500;
        result.message = error;
    } finally {
        logMaker.createLog(req, result);   
        res.status(result.code).json(result);
    }
});

async function deleteTodoItem(seq) {
    let result = {};
 
    if(Object.keys(result).length == 0) result = await verificareTodoItemSeq(seq);
    if(Object.keys(result).length == 0) {
        const [res] = await DB.executeQuery(`DELETE FROM TODO_ITEM WHERE ITEM_SQ = ${seq}`);    

        if(res.affectedRows > 0) {
            result = {
                code: 201,
                message: "TodoItem Deleted",
                data: res
            }
        }
    }

    return result;
}

module.exports = router;
