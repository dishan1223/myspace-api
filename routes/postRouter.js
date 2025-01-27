const express = require('express');
const { getAllPosts, newPost } = require('../controller/postController');
const auth = require('../handler/auth');
const postRouter = express.Router();

// Routes
postRouter.get('/', getAllPosts);
postRouter.post('/new', auth.verifyTokenMiddleware, newPost);

module.exports = postRouter;
