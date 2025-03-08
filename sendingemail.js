// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Submit exam endpoint
app.post('/submit-exam', (req, res) => {
    const { email, score, answers } = req.body;

    // Send email
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Exam Results',
        html: `
            <h2>Your Score: ${score}/3</h2>
            <p>Answers submitted:</p>
            <ul>
                <li>Question 1: ${answers.q1}</li>
                <li>Question 2: ${answers.q2}</li>
                <li>Question 3: ${answers.q3}</li>
            </ul>
        `
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            res.status(500).json({ message: 'Failed to send email' });
        } else {
            res.json({ message: 'Results sent to your email!' });
        }
    });
});