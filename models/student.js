
// //const schema=student_db.schema;
// //const student_db=new schema()
//     const student=require('student',
//     {
//         name:{
//             type:String,
//             required:true
//         },
//         number:{
//             type:Number,
//             required:true
//         },
//         email:{
//             type:String,
//             unique:true,
//             required:true
//         },
//         password:{
//             type:String,
//             required:true
//         },
//     },
//     {
//         tableName: "student_reg",
//         timestamps: true,
//     }

// )
// module.exports=student
const connection = require('../database');
const bcrypt = require('bcrypt');

// Create the Registeruser table if it doesn't already exist
const createRegisteruserTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Registeruser (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            number INT NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `;
    connection.query(query, (err) => {
        if (err) {
            console.error('Error creating Registeruser table:', err);
            return;
        }
        console.log('Registeruser table created or already exists.');
    });
};

createRegisteruserTable();

// Function to register a new user (hashing the password before storing it)
const registerUser = (user, callback) => {
    const query = `
        INSERT INTO Registeruser (name, number, email, password)
        VALUES (?, ?, ?, ?)
    `;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return callback(err);
        }
        const values = [user.name, user.number, user.email, hash];
        connection.query(query, values, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    });
};


const verifyUser = (email, password, callback) => {
    const query = `SELECT * FROM Registeruser WHERE email = ?`;
    connection.query(query, [email], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.length === 0) {
            return callback(null, false);
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return callback(err);
            }
            if (isMatch) {
                callback(null, user);
            } else {
                callback(null, false);
            }
        });
    });
};

module.exports = {
    registerUser,
    verifyUser
};
