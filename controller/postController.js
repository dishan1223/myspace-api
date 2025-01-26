const db = require('../db/db');

const getAllPosts = (req, res) => {
    console.log(`${req.method} - ${req.url} - ${req.ip} - ${new Date()}`);

    const query = 'SELECT * FROM posts';
    db.all(query, ( err, rows ) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    })
}

module.exports = {
    getAllPosts
}