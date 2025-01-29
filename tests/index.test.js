const supertest = require('supertest');
const app = require('../index');

describe('GET /', () => {
    // Tokens and user ID for testing
    let token;
    let userId;

    const testUser = {
        username: 'test',
        password: 'test'
    };
    
    // register and log in before testing anything
    beforeAll(async () => {
        //  Register a user (Handle existing user case)
        const registerResponse = await supertest(app)
            .post('/auth/new')
            .send(testUser);

        if (registerResponse.status !== 201 && registerResponse.status !== 409) {
            throw new Error(`User registration failed with status: ${registerResponse.status}`);
        }

        // Log in and get the token
        const loginResponse = await supertest(app)
            .post('/auth/login')
            .send(testUser);

        if (loginResponse.status !== 200) {
            throw new Error(`Login failed with status: ${loginResponse.status}`);
        }

        token = loginResponse.body.token;
        userId = loginResponse.body.userId;

        // Check if token and user ID are recieved 
        expect(token).toBeDefined();
        expect(userId).toBeDefined();
    });

    it('should respond with 200(OK)', async () => {
        const response = await supertest(app).get('/');
        expect(response.status).toBe(200);
    });
});

