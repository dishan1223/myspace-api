const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Register new user
const addUser = async (username, password) => {
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return new Promise((resolve, reject) => {
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
                if (err) {
                    if (err.code === 'SQLITE_CONSTRAINT') {
                        reject(new Error('Username already exists'));
                    } else {
                        reject(new Error('Database error: ' + err.message));
                    }
                } else {
                    resolve({ id: this.lastID, username });
                }
            });
        });
    } catch (err) {
        throw new Error('Error Hashing Password: ' + err.message);
    }
};

// Login and generate JWT token
const loginUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
            if (err) {
                reject(new Error('Database error: ' + err.message));
            } else if (!user) {
                reject(new Error('Invalid username or password'));
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    reject(new Error('Invalid username or password'));
                } else {
                    // Generate a JWT token
                    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
                    resolve(token);
                }
            }
        });
    });
};

// Verify JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
    addUser,
    loginUser,
    verifyToken,
};

