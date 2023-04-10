const CustomError = require('../common/CustomError');
const QueryMaker = require('../common/QueryMaker');

const tokenService = require('../services/tokenService');
const TodoUser = require('../repository/TodoUser');

async function loginUser(userId, userPw) {
    const userRes = await authenticateUser(userId, userPw);
    
    if(userRes) {        
        const jwt = await tokenService.createTokens(userId);
 
        const result = {
            code: 200,
            token: jwt,
            user: userRes
        }
   
        return result;
    }else {
        throw new CustomError(404, "Cannot Find User");
    }
}

async function logoutUser(userId) {
    tokenService.deleteToekn(userId);

    return {code: 200};
}

async function authenticateUser(userId, userPw) {
    const queryMaker = new QueryMaker();
    const todoUser = new TodoUser();

    let [userRes] = await todoUser.getTodoUser(queryMaker.createWhereClause({USER_ID: userId, USER_PW: userPw}));
    
    if(userRes.length > 0) {
        return userRes[0];
    }else {
        return false;
    }
}

async function authorization() {

}

module.exports = {loginUser, logoutUser};
