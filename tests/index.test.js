const supertest = require('supertest');
const app = require('../index');

// NOTES:
// while writing tests make sure to,
// use async/await when calling API
// user semicolons
// use .set to set headers

describe('API', () => {
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
    describe('GET /', () => {
        it('should respond with 200(OK)', async () => {
            const response = await supertest(app).get('/');
            expect(response.status).toBe(200);
        });
    })
    describe('posts/', ()=>{
        it('should respond with 200(OK)', async ()=>{
            const getPostsResponse = await supertest(app).get('/posts/');
            expect(getPostsResponse.status).toBe(200);
            // response should be in json format
            expect(getPostsResponse.type).toBe('application/json');
        });
        it('should respond with 200(OK) when user hits posts/:id', async ()=>{
            // post id's change don't change when a post is deleted
            // so post id = 3 may not always give a response. 
            // make sure to check all post id's in the database
            // then change the postId variable 
            const postId  = 3;
            const getPostResponse = await supertest(app).get(`/posts/${postId}`);

            if(getPostResponse.status === 200){
                expect(getPostResponse.type).toBe('application/json');
            }
        });
        it("should response with 201(created) when user hits posts/new", async ()=>{
            // to create a new post I need to send username, title, post, and token
            // token must be send as a header (authorization: Bearer <token>)
            
            const newPostResponse = await supertest(app)
                .post('/posts/new')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: testUser.username,
                    title: 'Test Post',
                    post: 'This is a test post'
                });
            
            // status should be 201(created)
            expect(newPostResponse.status).toBe(201);
            expect(newPostResponse.type).toBe('application/json');
        });
        it('edit post on /posts/:id route', async ()=>{
            const editPostResponse = await supertest(app)
                .put('/posts/edit/3')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: testUser.username,
                    title: 'Test Post 2',
                    post: 'This is a test post 2'
                })

            if(editPostResponse.status === 200){
                expect(editPostResponse.type).toBe('application/json');
            };
        })
    })
});

