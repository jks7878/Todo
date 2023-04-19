const DB = require('../db/DB');
const queryMaker = require('../common/QueryMaker');

async function getTodoUserCnt(cond) {
    return await DB.executeQuery(`SELECT COUNT(*) CNT FROM TODO_USER WHERE ${queryMaker.createWhereClause(cond)}`);
}

async function getTodoUser(cond) {
    return await DB.executeQuery(`SELECT * FROM TODO_USER WHERE ${queryMaker.createWhereClause(cond)}`);
}

async function insertTodoUser(userInfo) {
    return await DB.executeQuery(`INSERT INTO TODO_USER SET ${queryMaker.createSetClause(userInfo)}`);   
}

async function updateTodoUser(userInfo, userSeq) {
    return await DB.executeQuery(`UPDATE TODO_USER SET ${queryMaker.createSetClause(userInfo)} WHERE USER_SQ = ${userSeq}`);    
}

async function deleteTodoUser(userSeq) {
    return await DB.executeQuery(`DELETE FROM TODO_USER WHERE USER_SQ = ${userSeq}`);    
}

module.exports = { getTodoUser, getTodoUserCnt, insertTodoUser, updateTodoUser, deleteTodoUser };
