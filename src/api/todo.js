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
    } finally {
        logMaker.createLog(req, result);   
        res.status(result.code).json(result);
    }
});

async function createTodoItem(todo) {
    let result = {}; 

    if(Object.keys(result).length == 0) result = await verificareRegUserSeq(todo);
    if(Object.keys(result).length == 0) result = await insertIntoTodoItem(todo);

    return result;
}

async function verificareRegUserSeq(todo) {
    let result = {};

    const [user] = await DB.executeQuery(`SELECT USER_SQ FROM TODO_USER WHERE USER_SQ = ${todo.REG_USER_SQ}`);
    
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
    const seq = req.params.seq;
    
    const updateInfo = req.body;
    let result = {};
    let query = '';

    try {
        let setClause = queryMaker.createSetClause(updateInfo);
        
        query = `UPDATE TODO_ITEM SET ${setClause.join(',')} WHERE ITEM_SQ = ${seq}`; 

        [result] = await DB.executeQuery(query);    

        if(!result) {
            result = {
                code: 400,
                message: "Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails"
            };
        }else {
            if(result.changedRows > 0) logMaker.createLog(req,"info",query);   
        }
    } catch (error) { 
        logMaker.createLog(req,"error",error);
    } finally {
        res.json(result);
    }
});

router.delete('/:seq', async (req, res) => {
    const seq = req.params.seq;
    
    let result = {};

    try {
        const query = `DELETE FROM TODO_ITEM WHERE ITEM_SQ = ${seq}`; 
      
        [result] = await DB.executeQuery(query);    

        if(result.affectedRows > 0) logMaker.createLog(req,"info",query);   
    } catch (error) {
        logMaker.createLog(req,"error",error);
    } finally {
        res.json(result);
    }
});

module.exports = router;
