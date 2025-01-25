const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../handler/auth'); // Import auth module
const authRouter = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    // bearer TOKEN
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(401).send('Access Denied');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).send('Invalid token');
        } else {
            req.user = user;
            next();
        }
    });
}

// Fetch all users (for testing purposes)
authRouter.get('/user', async (req, res) => {
    try {
        const allUsers = await auth.getUser();
        res.json(allUsers); // Use JSON response for consistency
    } catch (err) {
        console.error('Error fetching users:', err); // Log the error for debugging
        res.status(500).send('Error fetching users');
    }
});

// Register a new user
authRouter.post('/new', async (req, res) => {
    const { username, password } = req.body;

    // Input validation
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
        res.status(201).json({
            message: 'User created successfully',
            user,
        });
    } catch (err) {
        console.error('Error creating user:', err); // Log the error
        if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(409).send('Username already exists');
        }
        res.status(500).send('Error creating user');
    }
});

module.exports = authRouter;

