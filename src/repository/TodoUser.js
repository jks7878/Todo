const DB = require('../db/DB');

class TodoUser {
    constructor() {
        this.DB = new DB();
    }

    async getTodoUser(whereClause) {
        return await this.DB.executeQuery(`SELECT * FROM TODO_USER WHERE ${whereClause}`);
    }
    
    async insertTodoUser(setClause) {
        return await this.DB.executeQuery(`INSERT INTO TODO_USER SET ${setClause}`);   
    }

    async updateTodoUser(setClause, userSeq) {
        return await this.DB.executeQuery(`UPDATE TODO_USER SET ${setClause} WHERE USER_SQ = ${userSeq}`);    
    }

    async deleteTodoUser(userSeq) {
        return await this.DB.executeQuery(`DELETE FROM TODO_USER WHERE USER_SQ = ${userSeq}`);    
    }
}

module.exports = TodoUser;
