const express = require('express');
const auth = require('../handler/auth');
const authRouter = express.Router();

// Register a new user
authRouter.post('/new', async (req, res) => {
    const { username, password } = req.body;

    if (
        !username || 
        !password || 
        typeof username !== 'string' || 
        typeof password !== 'string' || 
        username.includes(' ') || 
        password.includes(' ')
    ) {
        return res.status(400).send('Invalid username or password');
    }

    try {
        const user = await auth.addUser(username, password);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        if (err.message.includes('Username already exists')) {
            res.status(409).send(err.message);
        } else {
            res.status(500).send(err.message);
        }
    }
});

// Login and get JWT token
authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const token = await auth.loginUser(username, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(401).send(err.message);
    }
});

// Protected route to verify token
authRouter.get('/protected', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Token is required');
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    try {
        const user = auth.verifyToken(token);
        // verifyToken function will throw an error if token is invalid
        res.status(200).json({ message: 'Token is valid', user });
    } catch (err) {
        res.status(401).send(err.message);
    }
});

module.exports = authRouter;

