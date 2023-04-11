const CustomError = require('../common/CustomError');
const queryMaker = require('../common/QueryMaker');

const todoUser = require('../repository/todoUser');
const todoItem = require('../repository/todoItem');

async function checkUserInfoValue(userInfo) {
    let flag = true;

    if(!userInfo || Object.keys(userInfo).length == 0 ) flag = false;
    if(!userInfo.USER_ID || userInfo.USER_ID == '' || !userInfo.USER_PW || userInfo.USER_PW == '') flag = false;

    if(!flag) {
        throw new CustomError(400, "Invalid Value of UserInfo");
    }

    if(await this.validationOfUser({ USER_ID: userInfo.USER_ID })) {
        throw new CustomError(409, "UserId is Already Exist");
    }

    return flag;
}

async function createTodoUser(userInfo) {
    if(await this.checkUserInfoValue(userInfo)) {
        const [res] = await todoUser.insertTodoUser(queryMaker.createSetClause(userInfo));

        if(res.affectedRows > 0) {
            const result = {
                code: 201,
                message: "TodoUser Created",
                data: JSON.stringify(res)
            }
    
            return result;
        }else throw new CustomError(500);
    }
}

function checkParam(param) {
    let cond = {};

    if(Number.isInteger(parseInt(param))) {
        cond = {
            USER_SQ: param
        }
    }else {
        cond = {
            USER_ID: param
        }
    }

    return cond;
}

async function validationOfUser(cond) {
    const [res] = await todoUser.getTodoUser(queryMaker.createWhereClause(cond));

    if(res.length != 0) {
        return res;
    }else {
        return false;
    }
}

async function getTodoUser(param) {
    const userRes = await validationOfUser(checkParam(param));

    if(!userRes) {
        throw new CustomError(404, "Cannot Find User");
    }

    const result = {
        code: 200,
        data: JSON.stringify(userRes)
    }

    return result;  
}

async function getTodoItemsFromUserSeq(cond) {
    const userRes = await validationOfUser(checkParam(cond.REG_USER_SQ));

    if(!userRes) {
        throw new CustomError(404, "Cannot Find User");
    }

    const whereClause = queryMaker.createWhereClause(cond);
    const [itemRes] = await todoItem.getTodoItemFromUserSeq(whereClause, cond.offset, cond.limit);

    if(itemRes || itemRes.length != 0) {
        const result = {
            code: 200,
            data: JSON.stringify(itemRes)
        }

        return result;  
    }else throw new CustomError(500);
}

async function modifyTodoUser(userInfo) {
    console.log(userInfo);
    let userRes = await validationOfUser(checkParam(userInfo.USER_SQ));

    if(!userRes) {
        throw new CustomError(404, "Cannot Find User");
    }

    const setClause = queryMaker.createSetClause(userInfo);
    [userRes] = await todoUser.updateTodoUser(setClause, userInfo.USER_SQ);

    if(userRes || userRes.length != 0) {
        const result = {
            code: 200,
            message: "TodoUser Updated",
            data: JSON.stringify(userRes)
        }

        return result;  
    }else throw new CustomError(500);
}

async function deleteTodoUser(userSeq) {
    let userRes = await validationOfUser(checkParam(userSeq));

    if(!userRes) {
        throw new CustomError(404, "Cannot Find User");
    }

    [userRes] = await todoUser.deleteTodoUser(userSeq);

    if(userRes.affectedRows > 0) {
        const result = {
            code: 200,
            message: "TodoUser Deleted",
            data: JSON.stringify(userRes)
        }

        return result;
    }else throw new CustomError(500);
}

module.exports = { checkUserInfoValue, createTodoUser, checkParam, validationOfUser, getTodoUser, getTodoItemsFromUserSeq, modifyTodoUser, deleteTodoUser};
