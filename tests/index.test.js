const supertest = require('supertest');
const app = require('../index');

describe('GET /', () => {
    // tokens and id for testing
    let token;
    let userId;


    it('should response with 200(OK)', async () => {
        const response = await supertest(app).get('/');
        expect(response.status).toBe(200);
    });
});
