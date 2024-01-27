// userController.js
const User = require('../models/usermodel');


const createUser = async (req, res) => {
    try {
        const { phone_number, priority } = req.body;

        
        if (!phone_number || priority === undefined) {
            throw new Error('Incomplete user details');
        }

      
        const user = new User({
            phone_number,
            priority,
        });

        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    getAllUsers
};
