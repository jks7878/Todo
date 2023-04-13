const request = require('supertest');
const app = require('../../app');

describe('/api/users/:id', () => {
    const asf = require();
    test('validation userInfo', async () => {
        const response = await request(app).get("/api/users/1");
    
        // expect에 예상 값을, toBe에 결과 값을 넣는다.
        expect(response.code).toBe(200);
    });
})
