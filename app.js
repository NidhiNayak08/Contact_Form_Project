
//backend code

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 4400;

// Set up the body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname));

// Serve the contact form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle the form submission
app.post('/sendEmail', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    auth: {
      user: 'nidhi08052003@gmail.com',
      pass: 'nidhi@nayak'
    }
  });

  // Set the email options
  const mailOptions = {
    from: email,
    to: 'nidhi08052003@gmail.com',
    subject: `New Contact Form Submission: ${phone}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error occurred while sending email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully.');
      
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

