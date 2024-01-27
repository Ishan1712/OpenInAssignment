const cron = require('node-cron');
const Task = require('./src/models/taskmodel');
const User = require('./src/models/usermodel');
const { makeVoiceCall } = require('./twiliohelper');


cron.schedule('0 0 * * *', async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

       
        await Task.updateMany(
            { due_date: today, status: 'TODO' },
            { $inc: { priority: 1 } }
        );

        console.log('Task priorities updated successfully.');
    } catch (error) {
        console.error('Error updating task priorities:', error.message);
    }
    cron.start(); 
});


cron.schedule('* * * * *', async () => {
    try {
        
        const overdueTasks = await Task.find({ due_date: { $lt: new Date() }, status: 'TODO' })
            .populate('user')
            .sort({ 'user.priority': 1 }); 

        if (overdueTasks.length > 0) {
            const highestPriorityUser = overdueTasks[0].user;
            await makeVoiceCall(highestPriorityUser.phone_number);

            console.log(`Voice call made to user ${highestPriorityUser.phone_number}`);
        }
    } catch (error) {
        console.error('Error making voice call:', error.message);
    }
    cron.start(); 
});
