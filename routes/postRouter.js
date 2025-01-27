const express = require('express');
const { getAllPosts, newPost, deletePost } = require('../controller/postController');
const auth = require('../handler/auth');
const postRouter = express.Router();

// Routes
// to get all posts. Should one need to be logged in? 
postRouter.get('/', getAllPosts);
postRouter.post('/new', auth.verifyTokenMiddleware, newPost);
postRouter.post('/delete', auth.verifyTokenMiddleware, deletePost);

module.exports = postRouter;
