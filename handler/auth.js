const db = require('../db/db');
const bcrypt = require('bcrypt');

const addUser = async (username, password) => {
    const saltRounds = 10;

    try{
        // hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // insert the user into the database
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
                if (err) {
                    reject(err);                        
                }else {
                    resolve({ id: this.lastID, username });
                } 
            })            
        })
    } catch (err) {
        throw new Error('Error Hashing Password: ' + err.message);
    }
}

const getUser = () => {
    return new Promise((resolve, reject)=>{
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

module.exports = {
    addUser,
    getUser
}
