const db = require('../db/db');
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
        const { token, userId } = await auth.loginUser(username, password);
        
        res.status(200).json({ message: 'Login successful', token ,userId });
    } catch (err) {
        res.status(401).json({ message: 'Invalid username or password' });
    }
}

// if someone wants to delete his account
const deleteAccount = (req, res) => {
    // Assuming you're passing userId through JWT or as a URL param
    const userId = req.body.id; // Or req.params.userId if it's in the URL

    if (!userId) {
        return res.status(400).json({ error: true, message: 'User ID is required' });
    }

    const deletePostsQuery = 'DELETE FROM posts WHERE username = (SELECT username FROM users WHERE id = ?)';
    const deleteUserQuery = 'DELETE FROM users WHERE id = ?';

    // Start the transaction
    db.serialize(() => {
        db.run('BEGIN TRANSACTION', function (err) {
            if (err) {
                console.error('Error starting transaction:', err.message);
                return res.status(500).json({ error: true, message: 'Internal Server Error' });
            }

            // Delete posts first
            db.run(deletePostsQuery, [userId], function (err) {
                if (err) {
                    console.error('Error deleting posts:', err.message);
                    db.run('ROLLBACK', () => {
                        res.status(500).json({ error: true, message: 'Failed to delete posts' });
                    });
                    return;
                }

                // Then delete the user
                db.run(deleteUserQuery, [userId], function (err) {
                    if (err) {
                        console.error('Error deleting user:', err.message);
                        db.run('ROLLBACK', () => {
                            res.status(500).json({ error: true, message: 'Failed to delete user' });
                        });
                        return;
                    }

                    if (this.changes === 0) {
                        db.run('ROLLBACK', () => {
                            return res.status(404).json({ error: true, message: 'User not found' });
                        });
                    } else {
                        db.run('COMMIT', (err) => {
                            if (err) {
                                console.error('Error committing transaction:', err.message);
                                return res.status(500).json({ error: true, message: 'Internal Server Error' });
                            }
                            res.status(200).json({ success: true, message: 'Account and all associated posts deleted successfully' });
                        });
                    }
                });
            });
        });
    });
};


module.exports = {
    registerNewUser,
    loginUser,
    deleteAccount
};