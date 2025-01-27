require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');

const app = express();
const PORT = process.env.PORT || 4000; // Fixed PORT declaration

// locals for ejs
app.locals.title = "Myspace";

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index');
})

// authentication routes
app.use('/auth', authRouter); // Auth routes
app.use('/posts', postRouter);


// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

