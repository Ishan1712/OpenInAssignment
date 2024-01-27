// cors.js
const cors = require('cors');


const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};


const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
