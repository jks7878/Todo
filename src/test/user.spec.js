const { checkUserInfo, checkUserExist } = require('../middleware/userCheck');
const todoUser = require('../repository/todoUser');
jest.mock('../repository/todoUser');


describe('Middleware', () => {
  describe('checkUserInfo', () => {
    const res = {};

    it('should pass checkUserInfo middleware', async () => {
      const req = { body: { USER_ID: 'test', USER_PW: 'password' } };
      const next = jest.fn();

      await checkUserInfo(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if USER_ID is already exist', async () => {
      const req = { method: "POST", params: {}, body: { USER_ID: 'test', USER_PW: 'password' } };
      const next = jest.fn();

      const userCntRes = [{CNT: 1}];
      jest.spyOn(todoUser, 'getTodoUserCnt').mockResolvedValue([userCntRes]);
      await checkUserExist(req, res, next);
  
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message:'UserId is Already Exist' })
      );
    });

    it('should throw an error if request body is not provided', async () => {
      const req = { body: {} };
      const next = jest.fn();

      await checkUserInfo(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message:'Invalid Value of UserInfo' })
      );
    });


  });
});
