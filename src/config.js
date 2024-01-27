// config.js
module.exports = {
    PORT: process.env.PORT || 3001,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/Tasks',
    JWT_SECRET: '891bd0d4ef9fbcaf0dba53011e1cdbc59a0a2e77c19be9056eddd0c2485c4fdb',
};
