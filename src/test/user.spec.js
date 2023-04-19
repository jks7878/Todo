const { checkUserInfo, checkUserExist } = require('../middleware/userCheck');

describe('userCheck - checkUserInfo Unit Test', () => {
    test('req의 body가 비어있을 경우 400 error return', async () => {
      const req = { body: {} };
      const res = {};
      const next = jest.fn();
  
      await checkUserInfo(req, res, next);

      expect(next.mock.lastCall[0].code).toBe(400);
      expect(next.mock.lastCall[0].message).toBe('Invalid Value of UserInfo');
    });
  
    test('이미 존재하는 id로 가입 시도 시 409 error return', async () => {
      const req = { body: { USER_ID: 'test', USER_PW: 'password' } };
      const res = {};
      const next = jest.fn();
  
      await checkUserInfo(req, res, next);
  
      expect(next.mock.lastCall[0].code).toBe(409);
      expect(next.mock.lastCall[0].message).toBe('UserId is Already Exist');
    });
  
    test('신규 유저 가입 시 next() 호출', async () => {
      const req = { body: { USER_ID: 'newUser', USER_PW: 'password' } };
      const res = {};
      const next = jest.fn();
  
      await checkUserInfo(req, res, next);
  
      expect(next).toHaveBeenCalledTimes(1);
    });

    
  });

// describe("Test example", () => {
//     test('GET /api/users', async () => {
//         const response = await request(app).get('/api/users/0');        
//         expect(response.body.code).toBe(404);
//     });
// });
