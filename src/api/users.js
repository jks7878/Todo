const express = require('express');
const router = express.Router();

const queryMaker = require('../common/QueryMaker');
const logger = require('../common/Logger');

router.post('/', async (req, res) => {``
    const userInfo = req.body;
    let result = {};

    try {
        result = await createUser(userInfo);
    } catch (error) { 
        // result.code = 500;
        // result.message = error;
        // result.trace = error.stack;
        next(error);
    } finally {
        logger.createLog(req, result);
        res.json(result);
    }
});

async function createUser(userInfo) {
    let result = {};
    
    if(Object.keys(result).length == 0) result = await verificareUserId(userInfo.USER_ID);
    if(Object.keys(result).length == 0) result = await insertTodoUser(userInfo);
    
    return result;
}

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    let userInfo = [];

    try {
        const query = `SELECT * FROM TODO_USER WHERE USER_ID = '${id}'`;
        logger.createLog(req,"info",query);   

        [userInfo] = await DB.executeQuery(query);    
    } catch (error) {
        logger.createLog(req,"error",error);
    } finally {
        res.json(userInfo);
    }
});

router.get('/:seq/todo-items', async (req, res) => {
    const seq = req.params.seq;
    const offset = req.body.offset || 0;
    const limit = req.body.limit || 10;

    let status = 0;
    let todoItems = [];

    try {
        const query = `SELECT * FROM TODO_ITEM WHERE REG_USER_SQ = '${seq}' LIMIT ${offset},${limit}`;
        logger.createLog(req,"info",query);

        [todoItems] = await DB.executeQuery(query);    
        status = 200;
    } catch (error) {
        logger.createLog(req,"error",error);
        status = 400;
    } finally {
        res.status(status).json(todoItems);
    }
});

router.patch('/:seq', async (req, res) => {
    const seq = req.params.seq;
    
    const updateInfo = req.body;
    let result = {};
    let query = '';

    try {
        let setClause = queryMaker.createSetClause(updateInfo);

        query = `UPDATE TODO_USER SET ${setClause.join(',')} WHERE USER_SQ = ${seq}`; 

        [result] = await DB.executeQuery(query);    

        if(result.changedRows > 0) logger.createLog(req,"info",query);
    } catch (error) {
        logger.createLog(req,"error",error);
    } finally {
        res.json(result);
    }
});

router.delete('/:seq', async (req, res) => {
    const seq = req.params.seq;
    
    let result = {};

    try {
        const query = `DELETE FROM TODO_USER WHERE USER_SQ = ${seq}`; 
        
        [result] = await DB.executeQuery(query);    

        if(result.affectedRows > 0) logger.createLog(req,"info",query);
    } catch (error) {
        logger.createLog(req,"error",error);
    } finally {
        res.json(result);
    }
});

module.exports = router;
