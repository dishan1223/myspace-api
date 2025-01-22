const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./handler/auth');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res)=>{
    res.send('welcome to MYSPACE');
})
// /user route is just for testing
app.get('/user', async (req, res) => {
    try {
        const allUsers = await auth.getUser();
        res.send(allUsers);
    } catch (err) {
        res.status(500).send('Error fetching users');
    }
});

// register a new user
app.post('/user/new', async (req, res) => { // Changed to POST
    const { username, password } = req.body;
    
    // input validation
    if (
        !username || 
        !password || 
        typeof username !== 'string' || 
        typeof password !== 'string' || 
        username.includes(' ') || 
        password.includes(' ')
    ) {
        return res.status(400).send('Invalid username or password'); // Added return
    }

    try {
        const user = await auth.addUser(username, password);
        res.status(201).json({
            message: 'User created successfully',
            user
        });
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') { // Check error code instead of message
            res.status(409).send('Username already exists');
        } else {
            res.status(500).send('Error creating user');
        }
    }
});

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})
