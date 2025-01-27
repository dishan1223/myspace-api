const express = require('express');
const { getAllPosts, newPost, deletePost, getPostById } = require('../controller/postController');
const auth = require('../handler/auth');
const postRouter = express.Router();

// Routes
// to get all posts. Should one need to be logged in? 
postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById)
postRouter.post('/new', auth.verifyTokenMiddleware, newPost);
postRouter.delete('/delete', auth.verifyTokenMiddleware, deletePost);

module.exports = postRouter;
