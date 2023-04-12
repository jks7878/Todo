const DB = require('../db/DB');

async function getTodoItem(whereClause) {
    return await DB.executeQuery(`SELECT * FROM TODO_ITEM WHERE ${whereClause}`);
}

async function getTodoItemFromUserSeq(whereClause, offset, limit) {
    return await DB.executeQuery(`SELECT * FROM TODO_ITEM WHERE ${whereClause} LIMIT ${offset}, ${limit}`);
}

async function insertTodoItem(setClause) {
    return await DB.executeQuery(`INSERT INTO TODO_ITEM SET ${setClause}`);
}

async function updateTodoItem(setClause, itemSeq) {
    return await DB.executeQuery(`UPDATE TODO_ITEM SET ${setClause} WHERE ITEM_SQ = ${itemSeq}`);    
}

async function deleteTodoItem(itemSeq) {
    return await DB.executeQuery(`DELETE FROM TODO_ITEM WHERE ITEM_SQ = ${itemSeq}`);    
}

module.exports = { getTodoItem, getTodoItemFromUserSeq, insertTodoItem, updateTodoItem, deleteTodoItem };
