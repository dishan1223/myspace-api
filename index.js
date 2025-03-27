require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// locals for ejs
app.locals.title = "Myspace";

// Middleware
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// authentication routes
app.use('api/auth', authRouter);
app.use('api/posts', postRouter);

// Start server only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// exporting app for testing
module.exports = app;

