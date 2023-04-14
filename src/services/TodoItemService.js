const CustomError = require('../common/CustomError');

const todoUser = require('../repository/todoUser');
const todoItem = require('../repository/todoItem');

async function createTodoItem(todo) {
    const [insertRes] = await todoItem.insertTodoItem(todo);

    if(insertRes.affectedRows > 0) {
        const result = {
            code: 201,
            message: "TodoItem Created",
            data: JSON.stringify(insertRes)
        }

        return result;
    }else throw new CustomError(500);
}

async function getTodoItem(cond) {
    const [itemRes] = await todoItem.getTodoItem(cond);

    const result = {
        code: 200,
        data: itemRes
    }
    
    return result;
}

async function getTodoItemsFromUserSeq(cond) {
    const [itemRes] = await todoItem.getTodoItemFromUserSeq(cond);

    if(itemRes || itemRes.length != 0) {
        const result = {
            code: 200,
            data: JSON.stringify(itemRes)
        }

        return result;  
    }else throw new CustomError(500);
}

async function modifyTodoItem(todo) {    
    const [updateRes] = await todoItem.updateTodoItem(todo, todo.ITEM_SQ);

    if(updateRes.affectedRows > 0) {
        const result = {
            code: 200,
            message: "TodoItem Modified",
            data: JSON.stringify(updateRes)
        }

        return result;
    }else throw new CustomError(500);
}


async function deleteTodoItem(itemSeq) {
    const [deleteRes] = await todoItem.deleteTodoItem(itemSeq);

    if(deleteRes.affectedRows > 0) {
        const result = {
            code: 200,
            message: "TodoItem Deleted",
            data: JSON.stringify(deleteRes)
        }

        return result;
    }else throw new CustomError(500);
}

module.exports = { createTodoItem, getTodoItem, getTodoItemsFromUserSeq, modifyTodoItem, deleteTodoItem };
