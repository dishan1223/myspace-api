const auth = require('../handler/auth');

// controller to register / add new user
const registerNewUser = async (req, res) => {
    try {
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

        const user = await auth.addUser(username, password);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        if (err.message && err.message.includes('Username already exists')) {
            res.status(409).send(err.message);
        } else {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    }
};

const loginUser = async (req, res) => {
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
}

const testProtectedRoutes = (req, res) => {
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
}

module.exports = {
    registerNewUser,
    loginUser,
    testProtectedRoutes
};