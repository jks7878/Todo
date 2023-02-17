const express = require('express');
const router = express.Router();

const DB = require('../db/db');
const queryMaker = require('../common/queryMaker');
const logMaker = require('../common/logMaker');

router.post('/', async (req, res) => {
    const userInfo = req.body;
    let result = {};
    
    try {
        await createUser(userInfo);
        
        if(result.affectedRows > 0) logMaker.createLog(req,"info",query);   
    } catch (error) { 
        logMaker.createLog(req,"error",error);
    } finally {
        res.json(result);
    }
});

async function createUser(userInfo) {
    let setClause = queryMaker.createSetClause(userInfo);

    const query = `INSERT INTO TODO_USER SET ${setClause.join(',')}`;

    [result] = await DB.executeQuery(query);   
}

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    let userInfo = [];

    try {
        const query = `SELECT * FROM TODO_USER WHERE USER_ID = '${id}'`;
        logMaker.createLog(req,"info",query);   

        [userInfo] = await DB.executeQuery(query);    
    } catch (error) {
        logMaker.createLog(req,"error",error);
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
        logMaker.createLog(req,"info",query);

        [todoItems] = await DB.executeQuery(query);    
        status = 200;
    } catch (error) {
        logMaker.createLog(req,"error",error);
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

        if(result.changedRows > 0) logMaker.createLog(req,"info",query);
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
        const query = `DELETE FROM TODO_USER WHERE USER_SQ = ${seq}`; 
        
        [result] = await DB.executeQuery(query);    

        if(result.affectedRows > 0) logMaker.createLog(req,"info",query);
    } catch (error) {
        logMaker.createLog(req,"error",error);
    } finally {
        res.json(result);
    }
});

module.exports = router;
