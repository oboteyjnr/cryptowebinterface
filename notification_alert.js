import twilio from "twilio";

// Twilio Credentials - Use environment variables in production!
const accountSid = process.env.TWILIO_ACCOUNT_SID || "your_account_sid";
const authToken = process.env.TWILIO_AUTH_TOKEN || "your_auth_token";
const client = twilio(accountSid, authToken);

function sendSMS(message) {
    if (!message) {
        throw new Error('Message content is required');
    }

    return client.messages
        .create({
            body: message,    // Fixed: added comma and correct variable
            from: process.env.TWILIO_PHONE || "+1234567890",
            to: process.env.TARGET_PHONE || "+0987654321",
        })
        .then(() => {
            console.log("SMS sent successfully");
            return true;
        })
        .catch((error) => {
            console.error("Error sending SMS:", error.message);
            throw error;
        });
}

export default { sendSMS };