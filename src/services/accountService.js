const CustomError = require('../common/CustomError');
const queryMaker = require('../common/QueryMaker');
const tokenService = require('../services/tokenService');
const todoUser = require('../repository/todoUser');

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
    const result = await tokenService.deleteToken(userId);

    if(result) return {code: 200};
}

async function authenticateUser(userId, userPw) {
    let [userRes] = await todoUser.getTodoUser({USER_ID: userId, USER_PW: userPw});

    if(userRes.length > 0) {
        return userRes[0];
    }else {
        return false;
    }
}

module.exports = {loginUser, logoutUser};
