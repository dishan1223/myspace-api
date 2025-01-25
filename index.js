require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter'); // Correct path

const app = express();
const PORT = process.env.PORT || 4000; // Fixed PORT declaration

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter); // Auth routes
app.get('/', (req, res) => {
    res.send('Welcome to MYSPACE');
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

