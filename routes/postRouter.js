const express = require('express');
const { getAllPosts } = require('../controller/postController');
const postRouter = express.Router();

// Routes
postRouter.get('/', getAllPosts);

module.exports = postRouter;