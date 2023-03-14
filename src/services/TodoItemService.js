const CustomError = require('../common/CustomError');
const QueryMaker = require('../common/QueryMaker');

const TodoUser = require('../repository/TodoUser');
const TodoItem = require('../repository/TodoItem');

class TodoItemService {
    constructor() {
        this.queryMaker = new QueryMaker();
        this.todoItem = new TodoItem();
        this.todoUser = new TodoUser();
    }

    async getTodoItem(itemSeq) {
        const [res] = await this.todoItem.getTodoItem(this.queryMaker.createWhereClause({ ITEM_SQ: itemSeq }));
        if(!res || res.length == 0) {
            throw new CustomError(404, "Cannot Find Item");
        }

        const result = {
            code: 200,
            data: res
        }

        return result;
    }

    async createTodoItem(todo) {
        let [res] = await this.todoUser.getTodoUser(this.queryMaker.createWhereClause({ USER_SQ: todo.REG_USER_SQ }));
        if(!res || res.length == 0) {
            throw new CustomError(404, "Cannot Find User");
        }

        [res] = await this.todoItem.insertTodoItem(this.queryMaker.createSetClause(todo));
   
        if(res.affectedRows > 0) {
            const result = {
                code: 201,
                message: "TodoItem Created",
                data: JSON.stringify(res)
            }
    
            return result;
        }else throw new CustomError(500);
    }

    async modifyTodoItem(todo) {    
        let [res] = await this.todoUser.getTodoUser(this.queryMaker.createWhereClause({ USER_SQ: todo.REG_USER_SQ }));
        if(!res || res.length == 0) {
            throw new CustomError(404, "Cannot Find User");
        }

        [res] = await this.todoItem.getTodoItem(this.queryMaker.createWhereClause({ ITEM_SQ: todo.ITEM_SQ }));
        if(!res || res.length == 0) {
            throw new CustomError(404, "Cannot Find Item");
        }


        [res] = await this.todoItem.updateTodoItem(this.queryMaker.createSetClause(todo), todo.ITEM_SQ);

        if(res.affectedRows > 0) {
            const result = {
                code: 200,
                message: "TodoItem Modified",
                data: JSON.stringify(res)
            }
    
            return result;
        }else throw new CustomError(500);
    }
    
    
    async deleteTodoItem(itemSeq) {
        let [res] = await this.todoItem.getTodoItem(this.queryMaker.createWhereClause({ITEM_SQ: itemSeq}));
        if(res.length == 0) {
            throw new CustomError(404, "Cannot Find Item");
        }

        [res] = await this.todoItem.deleteTodoItem(itemSeq);

        if(res.affectedRows > 0) {
            const result = {
                code: 200,
                message: "TodoItem Deleted",
                data: JSON.stringify(res)
            }
    
            return result;
        }else throw new CustomError(500);
    }
}

module.exports = TodoItemService;
