const DB = require('../db/DB');

class TodoItem {
    constructor() {
        this.DB = new DB();
    }
    async getTodoItem(whereClause) {
        return await this.DB.executeQuery(`SELECT * FROM TODO_ITEM WHERE ${whereClause}`);
    }

    async getTodoItemFromUserSeq(whereClause, offset, limit) {
        return await this.DB.executeQuery(`SELECT * FROM TODO_ITEM WHERE ${whereClause} LIMIT ${offset}, ${limit}`);
    }

    async insertTodoItem(setClause) {
        return await this.DB.executeQuery(`INSERT INTO TODO_ITEM SET ${setClause}`);
    }

    async updateTodoItem(setClause, itemSeq) {
        return await this.DB.executeQuery(`UPDATE TODO_ITEM SET ${setClause} WHERE ITEM_SQ = ${itemSeq}`);    
    }

    async deleteTodoItem(itemSeq) {
        return await this.DB.executeQuery(`DELETE FROM TODO_ITEM WHERE ITEM_SQ = ${itemSeq}`);    
    }
}

module.exports = TodoItem;
