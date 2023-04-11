const DB = require('../db/DB');

async function getTodoUser(whereClause) {
    return await DB.executeQuery(`SELECT * FROM TODO_USER WHERE ${whereClause}`);
}

async function insertTodoUser(setClause) {
    return await DB.executeQuery(`INSERT INTO TODO_USER SET ${setClause}`);   
}

async function updateTodoUser(setClause, userSeq) {
    return await DB.executeQuery(`UPDATE TODO_USER SET ${setClause} WHERE USER_SQ = ${userSeq}`);    
}

async function deleteTodoUser(userSeq) {
    return await DB.executeQuery(`DELETE FROM TODO_USER WHERE USER_SQ = ${userSeq}`);    
}

module.exports = { getTodoUser, insertTodoUser, updateTodoUser, deleteTodoUser };
