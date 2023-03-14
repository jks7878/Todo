const CustomError = require('../common/CustomError');
const QueryMaker = require('../common/QueryMaker');

const TodoUser = require('../repository/TodoUser');
const TodoItem = require('../repository/TodoItem');

class TodoUserService {
    constructor() {
        this.queryMaker = new QueryMaker();
        this.todoUser = new TodoUser();
        this.todoItem = new TodoItem();
    }

    async checkUserInfoValue(userInfo) {
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

    async createTodoUser(userInfo) {
        if(await this.checkUserInfoValue(userInfo)) {
            const [res] = await this.todoUser.insertTodoUser(this.queryMaker.createSetClause(userInfo));
   
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

    checkParam(param) {
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

    async validationOfUser(cond) {
        const [res] = await this.todoUser.getTodoUser(this.queryMaker.createWhereClause(cond));

        if(res.length != 0) {
            return res;
        }else {
            return false;
        }
    }

    async getTodoUser(param) {
        const userRes = await this.validationOfUser(this.checkParam(param));

        if(!userRes) {
            throw new CustomError(404, "Cannot Find User");
        }

        const result = {
            code: 200,
            data: JSON.stringify(userRes)
        }

        return result;  
    }

    async getTodoItemsFromUserSeq(cond) {
        const userRes = await this.validationOfUser(this.checkParam(cond.REG_USER_SQ));

        if(!userRes) {
            throw new CustomError(404, "Cannot Find User");
        }

        const whereClause = this.queryMaker.createWhereClause(cond);
        const [itemRes] = await this.todoItem.getTodoItemFromUserSeq(whereClause, cond.offset, cond.limit);

        if(itemRes || itemRes.length != 0) {
            const result = {
                code: 200,
                data: JSON.stringify(itemRes)
            }
    
            return result;  
        }else throw new CustomError(500);
    }

    async modifyTodoUser(userInfo) {
        let userRes = await this.validationOfUser(this.checkParam(userInfo.USER_SQ));

        if(!userRes) {
            throw new CustomError(404, "Cannot Find User");
        }
  
        const setClause = this.queryMaker.createSetClause(userInfo);
        [userRes] = await this.todoUser.updateTodoUser(setClause, userInfo.USER_SQ);

        if(res || res.length != 0) {
            const result = {
                code: 200,
                message: "TodoUser Updated",
                data: JSON.stringify(userRes)
            }
    
            return result;  
        }else throw new CustomError(500);
    }

    async deleteTodoUser(userSeq) {
        let userRes = await this.validationOfUser(this.checkParam(userSeq));

        if(!userRes) {
            throw new CustomError(404, "Cannot Find User");
        }

        [userRes] = await this.todoUser.deleteTodoUser(userSeq);

        if(userRes.affectedRows > 0) {
            const result = {
                code: 200,
                message: "TodoUser Deleted",
                data: JSON.stringify(userRes)
            }
    
            return result;
        }else throw new CustomError(500);
    }
}

module.exports = TodoUserService;
