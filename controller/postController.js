const db = require('../db/db');

const getAllPosts = (req, res) => {
    console.log(`${req.method} - ${req.url} - ${req.ip} - ${new Date()}`);

    const query = 'SELECT * FROM posts';
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
};

const newPost = (req, res) => {
    console.log(`${req.method} - ${req.url} - ${req.ip} - ${new Date()}`);

    const { username, title, post } = req.body;

    // Input validations
    if (
        !username ||
        !title ||
        !post ||
        typeof username !== 'string' ||
        typeof title !== 'string' ||
        typeof post !== 'string' ||
        username.includes(' ')
    ) {
        return res.status(400).json({
            error: 'Invalid input: username, title, and post are required, and no spaces are allowed in the username.',
        });
    }

    const query = 'INSERT INTO posts (username, title, post) VALUES (?, ?, ?)';
    db.run(query, [username, title, post], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Post created successfully', id: this.lastID });
    });
};

module.exports = {
    getAllPosts,
    newPost,
};
