const CustomError = require('../common/CustomError');
const QueryMaker = require('../common/QueryMaker');

const TodoUser = require('../repository/TodoUser');
const TodoItem = require('../repository/TodoItem');

class TodoItemService {
    async getTodoItem(itemSeq) {
        const queryMaker = new QueryMaker();
        const todoItem = new TodoItem();

        const [res] = await todoItem.getTodoItem(queryMaker.createWhereClause({ ITEM_SQ: itemSeq }));
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
        const queryMaker = new QueryMaker();
        const todoUser = new TodoUser();
        const todoItem = new TodoItem();


        let [res] = await todoUser.getTodoUser(queryMaker.createWhereClause({ USER_SQ: todo.REG_USER_SQ }));
        if(!res || res.length == 0) {
            throw new CustomError(404, "Cannot Find User");
        }

        [res] = await todoItem.insertTodoItem(queryMaker.createSetClause(todo));
   
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
        const queryMaker = new QueryMaker();
        const todoUser = new TodoUser();
        const todoItem = new TodoItem();

        let [res] = await todoUser.getTodoUser(queryMaker.createWhereClause({ USER_SQ: todo.REG_USER_SQ }));
        if(!res || res.length == 0) {
            throw new CustomError(404, "Cannot Find User");
        }

        [res] = await todoItem.getTodoItem(queryMaker.createWhereClause({ ITEM_SQ: todo.ITEM_SQ }));
        if(!res || res.length == 0) {
            throw new CustomError(404, "Cannot Find Item");
        }


        [res] = await todoItem.updateTodoItem(queryMaker.createSetClause(todo), todo.ITEM_SQ);

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
        const queryMaker = new QueryMaker();
        const todoItem = new TodoItem();

        let [res] = await todoItem.getTodoItem(queryMaker.createWhereClause({ITEM_SQ: itemSeq}));
        if(res.length == 0) {
            throw new CustomError(404, "Cannot Find Item");
        }

        [res] = await todoItem.deleteTodoItem(itemSeq);

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
