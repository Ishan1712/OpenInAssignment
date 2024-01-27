// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./src/config');
const taskRoutes = require('./src/routes/taskRoutes');
const userRoutes = require('./src/routes/userRoutes');
const subtaskRoutes = require('./src/routes/subtaskRoutes');

const cron = require('./conrs');

const app = express();


app.use(bodyParser.json());


mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.use('/api', taskRoutes);
app.use('/api', userRoutes);
app.use('/api', subtaskRoutes);



const PORT = config.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
