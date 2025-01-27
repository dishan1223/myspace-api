const express = require('express');
const posts = require('../controller/postController');
const auth = require('../handler/auth');
const postRouter = express.Router();

// Routes
// to get all posts. Should one need to be logged in? 
postRouter.get('/', posts.getAllPosts);
postRouter.get('/:id', posts.getPostById)
postRouter.post('/new', auth.verifyTokenMiddleware, posts.newPost);
postRouter.put('/edit/:id', auth.verifyTokenMiddleware, posts.editPost);
postRouter.delete('/delete', auth.verifyTokenMiddleware, posts.deletePost);

module.exports = postRouter;
