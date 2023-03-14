const CustomError = require('../common/CustomError');
const QueryMaker = require('../common/QueryMaker');
const JWT = require('../common/JWT');

const TodoUser = require('../repository/TodoUser');

async function authenticateUser(userId, userPw) {
    const queryMaker = new QueryMaker();
    const todoUser = new TodoUser();

    let [userRes] = await todoUser.getTodoUser(queryMaker.createWhereClause({USER_ID: userId, USER_PW: userPw}));
    
    if(userRes.length > 0) {
        const payload = {
            USER_SQ: userRes[0].USER_SQ,
            USER_ID: userRes[0].USER_ID,
            USER_NAME: userRes[0].USER_NAME
        }
        
        const token = JWT.createToken(payload);
        const result = {
            code: 200,
            data: token
        }

        return result;
    }else {
        throw new CustomError(404, "Cannot Find User");
    }
}

module.exports = {authenticateUser};