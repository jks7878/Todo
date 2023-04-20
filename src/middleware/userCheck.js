const CustomError = require('../common/CustomError');
const todoUser = require('../repository/todoUser');

module.exports = {
    checkUserInfo: async function (req, res, next) {
        try {
            let flag = true;
    
            if(!req.body || Object.keys(req.body).length == 0 ) flag = false;
            if(!req.body.USER_ID || req.body.USER_ID == '' || !req.body.USER_PW || req.body.USER_PW == '') flag = false;
        
            if(!flag) throw new CustomError(400, "Invalid Value of UserInfo");

            next();
        } catch (error) {
            next(error);
        }
    },
    checkUserExist: async function (req, res, next) {
        try {
            req.cond = checkParam(req.params.param ?? req.params.seq ?? req.body.REG_USER_SQ ?? req.body.USER_ID);

            const [userCntRes] = await todoUser.getTodoUserCnt(req.cond);
 
            if(req.method === "POST" && userCntRes && userCntRes[0].CNT > 0) throw new CustomError(409, "UserId is Already Exist");
            if(req.method !== "POST" && (!userCntRes || userCntRes[0].CNT == 0)) throw new CustomError(404, "Cannot Find User");
  
            next();
        } catch (error) {
            next(error);
        }
    }
};

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
