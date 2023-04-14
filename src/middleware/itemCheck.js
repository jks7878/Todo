const CustomError = require('../common/CustomError');
const todoItem = require('../repository/todoItem');

module.exports = {
    checkItemExist: async function (req, res, next) {
        try {
            req.cond = {
                ITEM_SQ: req.params.param || req.params.seq
            }

            const [itemCntRes] = await todoItem.getTodoItemCnt(req.cond);
            
            if(!itemCntRes || itemCntRes[0].CNT <= 0) throw new CustomError(404, "Cannot Find Item");

            next();
        } catch (error) {
            next(error);
        }
    }
};
