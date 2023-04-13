const CustomError = require('../common/CustomError');
const todoUser = require('../repository/todoUser');

async function createTodoUser(userInfo) {
    const [insertRes] = await todoUser.insertTodoUser(userInfo);

    if(insertRes.affectedRows > 0) {
        const result = {
            code: 201,
            message: "TodoUser Created",
            data: JSON.stringify(insertRes)
        }

        return result;
    }else throw new CustomError(500);
}

async function getTodoUser(cond) {
    const [userRes] = await todoUser.getTodoUser(cond);
    
    const result = {
        code: 200,
        data: JSON.stringify(userRes)
    }

    return result;  
}

async function modifyTodoUser(userInfo) {
    const [updateRes] = await todoUser.updateTodoUser(userInfo, userInfo.USER_SQ);

    if(updateRes || updateRes.length != 0) {
        const result = {
            code: 200,
            message: "TodoUser Updated",
            data: JSON.stringify(updateRes)
        }

        return result;  
    }else throw new CustomError(500);
}

async function deleteTodoUser(userSeq) {
    const [deleteRes] = await todoUser.deleteTodoUser(userSeq);

    if(deleteRes.affectedRows > 0) {
        const result = {
            code: 200,
            message: "TodoUser Deleted",
            data: JSON.stringify(deleteRes)
        }

        return result;
    }else throw new CustomError(500);
}

module.exports = { createTodoUser, getTodoUser, modifyTodoUser, deleteTodoUser};
