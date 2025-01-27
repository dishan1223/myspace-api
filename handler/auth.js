const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}

// Register new user
const addUser = async (username, password) => {
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, hashedPassword],
                function (err) {
                    if (err) {
                        if (err.code === 'SQLITE_CONSTRAINT') {
                            reject(new Error('Username already exists'));
                        } else {
                            reject(new Error('Database error: ' + err.message));
                        }
                    } else {
                        resolve({ id: this.lastID, username });
                    }
                }
            );
        });
    } catch (err) {
        throw new Error('Error hashing password: ' + err.message);
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
                    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
                        expiresIn: '1h', // Token expiration time
                    });
                    resolve({token, userId: user.id});
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

// Middleware to verify token in requests
const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
};

module.exports = {
    addUser,
    loginUser,
    verifyToken,
    verifyTokenMiddleware,
};
