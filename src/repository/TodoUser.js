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
}

module.exports = TodoUser;
