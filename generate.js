//code to generate jwt token
const jwt = require('jsonwebtoken');
const config = require('./src/config'); 

const generateJWTToken = (userId, username) => {
    const payload = {
        userId,
        username,
    };

    const options = {
        expiresIn: '1h', 
    };

    const token = jwt.sign(payload, config.JWT_SECRET, options);
    return token;
};


const userId = 123; 
const username = 'Ishaan'; 

const newToken = generateJWTToken(userId, username);
console.log('New Token:', newToken);
