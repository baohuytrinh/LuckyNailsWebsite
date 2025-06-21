require('dotenv').config();

const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();


// mongoDB

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI)
  .then(() => {console.log('Connected to MongoDB');})
  .catch(err => {console.error('MongoDB connection error:', err);});


const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  service: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// mongoDB end

console.log('Serving static files from:', path.join(__dirname, '..'));
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());
app.use(cors());

app.post('/contact', async (req, res) => {
  const { name, number, email, service, message } = req.body;

  //MongoDB
  try {
    await Contact.create({ name, number, email, service, message });
  } catch (dbError) {
    console.error('MongoDB error:', dbError);
    return res.status(500).json({ message: 'Failed to save to database.' });
  }


  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anthonytrinh0508@gmail.com',
      pass: 'egbniahjaexobpar'
    }
  });

  let mailOptions = {
    from: 'anthonytrinh0508@gmail.com',
    //gmail (and most SMTP providers) will reject emails where the "from" address is not the same as the authenticated user.
    to: 'anthonytrinh0508@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Number: ${number}
      Email: ${email}
      Service: ${service}
      Message: ${message}
    `
  };

  
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Failed to send message.', error });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});


// const express = require('express');
// const path = require('path');
// const app = express();

// console.log('Serving static files from:', path.join(__dirname, '..'));
// app.use(express.static(path.join(__dirname, '..')));

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });