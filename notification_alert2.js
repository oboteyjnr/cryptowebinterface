import { createTransport } from "nodemailer";

// Email Configuration
const transporter = createTransport({
    service: "gmail",
    auth: {
        user: "your_email@gmail.com",
        pass: "your_email_password",
    },
});

function sendEmail(message) {
    const mailOptions = {
        from: "your_email@gmail.com",
        to: "client_email@gmail.com",
        subject: "Crypto Price Alert",
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

export default { sendEmail };
