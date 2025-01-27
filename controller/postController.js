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

const getPostById = (req, res) => {
    id = req.params.id;
    
    const query = 'SELECT * FROM posts WHERE id = (?)';
    try{
        db.get(query, [id], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (!row) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(row);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deletePost = (req, res) => {
    console.log('DELETE POST');
    const { id } = req.body;

    if(!id || typeof id !== 'number') {
        return res.status(400).json({ error: 'Invalid input: id is required and must be a number.' });
    }

    const query = 'DELETE FROM posts WHERE id = ?';
    try {
        db.run(query, [id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllPosts,
    newPost,
    getPostById,
    deletePost
};
