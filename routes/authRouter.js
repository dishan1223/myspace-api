const express = require('express');
const { verifyTokenMiddleware } = require('../handler/auth');
const { registerNewUser, loginUser, deleteAccount } = require('../controller/authController');
const authRouter = express.Router();

// Routes
// Register a new user
authRouter.post('/new', registerNewUser);
// Login and get JWT token
authRouter.post('/login', loginUser);
// Delete account
authRouter.delete('/delete',verifyTokenMiddleware, deleteAccount);

module.exports = authRouter;

