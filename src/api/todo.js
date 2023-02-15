const express = require('express');
const router = express.Router();

const logger = require('../config/winston');
const DB = require('../db/db');
const common = require('../common/queryMaker');

router.post('/', async (req, res) => {
    const API_NAME = 'Create Todo';
    
    const todo = req.body;
    let result = {};
    
    try {
        let setClause = common.createSetClause(todo);
   
        const query = `INSERT INTO TODO_ITEM SET ${setClause.join(',')}`;
        logger.info(`${API_NAME} - ${query}`);   

        result = await DB.executeQuery(query);    

        if(result == false) {
            result.push({
                code: 400,
                message: "존재하지 않는 foreign key",
                cause: query
            });
        }
    } catch (error) {
        logger.error(`${API_NAME} - ${error}`);
    } finally {
        res.json(result);
    }
});

router.get('/:seq', async (req, res) => {
    const API_NAME = 'Get TodoList';
    const seq = req.params.seq;
    const offset = req.body.offet;
    const limit = req.body.limit;

    let todoList = [];

    try {
        const query = `SELECT * FROM TODO_ITEM WHERE REG_USER_SQ = '${seq}' LIMIT ${offset}, ${limit}`;
        logger.info(`${API_NAME} - ${query}`);

        [todoList] = await DB.executeQuery(query);    
    } catch (error) {
        logger.error(`${API_NAME} - ${error}`);
    } finally {
        res.json(todoList);
    }
});

router.patch('/:seq', async (req, res) => {
    const API_NAME = 'Update Todo';
    const seq = req.params.seq;
    
    const updateInfo = req.body;
    let result = {};
    let query = '';

    try {
        let setClause = common.createSetClause(updateInfo);
        
        query = `UPDATE TODO_ITEM SET ${setClause.join(',')} WHERE USER_SQ = ${seq}`; 

        [result] = await DB.executeQuery(query);    
    } catch (error) {
        logger.error(`${API_NAME} - ${error}`);
    } finally {
        res.json(result);
    }
});

router.delete('/:sq', async (req, res) => {
    const API_NAME = 'Delete Todo';
    const seq = req.params.seq;
    
    let result = {};

    try {
        const query = `DELETE FROM TODO_USER WHERE USER_SQ = ${seq}`; 
        logger.info(`${API_NAME} - ${query}`);

        [result] = await DB.executeQuery(query);    
    } catch (error) {
        logger.error(`${API_NAME} - ${error}`);
    } finally {
        console.log(result);
        if(result.changedRows > 0) logger.info(`${API_NAME} - ${query}`);  
        res.json(result);
    }
});


module.exports = router;