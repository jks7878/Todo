const express = require('express');

const DB = require('../db/db');
const logger = require('../config/winston');

const router = express.Router();

router.post('/', async (req, res) => {
    const API_NAME = 'Create User';
    
    const userInfo = req.body;
    let result = {};
    
    try {
        let setClause = [];
        
        for(let key of Object.keys(userInfo)) {
            let value = userInfo[key];
            if(value && value != '') setClause.push(`${key} = '${value}'`);
        }

        const query = `INSERT INTO TODO_USER SET ${setClause.join(',')}`;
        logger.info(`${API_NAME} - ${query}`);   

        [result] = await DB.executeQuery(query);    
    } catch (error) {
        logger.error(`${API_NAME} - ${error}`);
    } finally {
        res.json(result);
    }
});

router.get('/:id', async (req, res) => {
    const API_NAME = 'Get User';
    const id = req.params.id;

    let userInfo = [];

    try {
        const query = `SELECT * FROM TODO_USER WHERE USER_ID = '${id}'`;
        logger.info(`${API_NAME} - ${query}`);

        [userInfo] = await DB.executeQuery(query);    
    } catch (error) {
        logger.error(`${API_NAME} - ${error}`);
    } finally {
        res.json(userInfo);
    }
});

router.get('/:seq/todo-items', async (req, res) => {
    const API_NAME = 'Get Users TodoItems';
    const seq = req.params.seq;
    const offset = req.body.offset || 0;
    const limit = req.body.limit || 10;

    let todoItems = [];

    try {
        const query = `SELECT * FROM TODO_ITEM WHERE REG_USER_SQ = '${seq}' LIMIT ${offset},${limit}`;
        logger.info(`${API_NAME} - ${query}`);

        [todoItems] = await DB.executeQuery(query);    
    } catch (error) {
        logger.error(`${API_NAME} - ${error}`);
    } finally {
        res.json(todoItems);
    }
});

router.patch('/:seq', async (req, res) => {
    const API_NAME = 'Update User';
    const seq = req.params.seq;
    
    const updateInfo = req.body;
    let result = {};
    let query = '';

    try {
        let setClause = [];
        
        for(let key of Object.keys(updateInfo)) {
            let value = updateInfo[key];
            if(value && value != '') setClause.push(`${key} = '${value}'`);
        }

        query = `UPDATE TODO_USER SET ${setClause.join(',')} WHERE USER_SQ = ${seq}`; 

        [result] = await DB.executeQuery(query);    
    } catch (error) {
        logger.error(`${API_NAME} - ${error}`);
    } finally {
        if(result.changedRows > 0) logger.info(result);  
        res.json(result);
    }
});

router.delete('/:seq', async (req, res) => {
    const API_NAME = 'Delete User';
    const seq = req.params.seq;
    
    let result = {};

    try {
        const query = `DELETE FROM TODO_USER WHERE USER_SQ = ${seq}`; 
        logger.info(`${API_NAME} - ${query}`);

        [result] = await DB.executeQuery(query);    
    } catch (error) {
        logger.error(`${API_NAME} - ${error}`);
    } finally {
        if(result.affetchedRows > 0) logger.info(result);  
        res.json(result);
    }
});

module.exports = router;
