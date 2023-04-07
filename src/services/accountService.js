const CustomError = require('../common/CustomError');
const QueryMaker = require('../common/QueryMaker');

const tokenService = require('../services/tokenService');
const TodoUser = require('../repository/TodoUser');

async function loginUser(req) {
    const userRes = await authenticateUser(req.body.USER_ID, req.body.USER_PW);
    
    if(userRes) {        
        const jwt = tokenService.createToken(req.body.USER_ID);
        
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

async function logoutUser(req) {
    let jwt = token.verifyToken(req.headers.authorization);
    if(req.headers.authorization === refreshToken) {
        return "재발급";
    }
    return jwt;
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
