const DB = require('../db/DB');
const queryMaker = require('../common/QueryMaker');

async function getTodoItemCnt(cond) {
    return await DB.executeQuery(`SELECT COUNT(*) CNT FROM TODO_ITEM WHERE ${queryMaker.createWhereClause(cond)}`);
}

async function getTodoItem(cond) {
    return await DB.executeQuery(`SELECT * FROM TODO_ITEM WHERE ${queryMaker.createWhereClause(cond)}`);
}

async function getTodoItemFromUserSeq(cond) {
    return await DB.executeQuery(`SELECT * FROM TODO_ITEM WHERE ${queryMaker.createWhereClause(cond)} LIMIT ${cond.offset}, ${cond.limit}`);
}

async function insertTodoItem(todo) {
    return await DB.executeQuery(`INSERT INTO TODO_ITEM SET ${queryMaker.createSetClause(todo)}`);
}

async function updateTodoItem(todo, itemSeq) {
    return await DB.executeQuery(`UPDATE TODO_ITEM SET ${queryMaker.createSetClause(todo)} WHERE ITEM_SQ = ${itemSeq}`);    
}

async function deleteTodoItem(itemSeq) {
    return await DB.executeQuery(`DELETE FROM TODO_ITEM WHERE ITEM_SQ = ${itemSeq}`);    
}

module.exports = { getTodoItem, getTodoItemCnt, getTodoItemFromUserSeq, insertTodoItem, updateTodoItem, deleteTodoItem };
