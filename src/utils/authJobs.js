const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token Missing' });
    }

    jwt.verify(token.replace('Bearer ', ''), config.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token Verification Error:', err.message);
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

module.exports = {
    authenticateJWT,
};
