// twilioHelper.js
const twilio = require('twilio');

const accountSid = 'AC3519633d30433c8f856c6d7aed4f371d';
const authToken = '59df291d0d412a0e437c42a2ec7e521e';
const twilioPhoneNumber = '9921057909';

const client = twilio(accountSid, authToken);

const makeVoiceCall = async (toPhoneNumber) => {
    try {
        const call = await client.calls.create({
            twiml: '<Response><Say>Hello! This is a reminder for your task.</Say></Response>',
            to: toPhoneNumber,
            from: twilioPhoneNumber,
        });

        console.log(`Voice call SID: ${call.sid}`);
    } catch (error) {
        console.error('Error making voice call:', error.message);
        throw error;
    }
};

module.exports = {
    makeVoiceCall,
};

