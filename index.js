require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');

const app = express();
const PORT = process.env.PORT || 4000; // Fixed PORT declaration

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// authentication routes
app.use('/auth', authRouter); // Auth routes
app.use('/posts', postRouter);

// posts routes


app.get('/', (req, res) => {
    res.send('Welcome to MYSPACE');
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

