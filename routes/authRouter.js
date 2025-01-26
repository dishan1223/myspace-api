const express = require('express');
const { registerNewUser, loginUser, testProtectedRoutes } = require('../controller/authController');
const authRouter = express.Router();

// Routes
// Register a new user
authRouter.post('/new', registerNewUser);
// Login and get JWT token
authRouter.post('/login', loginUser);
// Protected route to verify token
authRouter.get('/protected', testProtectedRoutes);

module.exports = authRouter;

